import { Injectable, Module } from '@nestjs/common';

import { createDfuseClient, InboundMessage, InboundMessageType, waitFor, DfuseClient, GetActionTracesMessageData, Stream, OnStreamMessage, SearchTransactionsResponse, SearchSortType, Action, dynamicMessageDispatcher, ActionTraceInboundMessage, ProgressInboundMessage } from "@dfuse/client"
import { IncomingMessage } from "http"
import nodeFetch from "node-fetch"
import * as WebSocketClient from 'ws'
import { KyubeyTransactionRepository } from 'src/Repository/KyubeyTransactionRepository';
import { async } from 'rxjs/internal/scheduler/async';
import { KyubeyEosTransactionService } from './KyubeyEosTransactionService';


@Injectable()
export class DfuseService {
  private dfuseClient: DfuseClient;
  private stream?: Stream;
  private lastCommittedBlockNum: number = 0;
  private pendingActions: Action<KarmaTransfer>[] = []
  private committedActions: Action<KarmaTransfer>[] = []
  constructor(
    private readonly kyubeyTransactionRepository: KyubeyTransactionRepository,
    private readonly kyubeyEosTransactionService: KyubeyEosTransactionService
  ) {
    this.CreateDfuseClient()
  }
  private CreateDfuseClient() {
    this.dfuseClient = createDfuseClient({
      apiKey: "server_816baafdc4bf9429fe0554ef0f5168f2",
      network: "mainnet",
      httpClientOptions: {
        fetch: nodeFetch
      },
      streamClientOptions: {
        socketOptions: {
          /**
           * The factory receives the full resolved URL, API token included,
           * of the remote endpoint to connect to.
           *
           * It's here also, when using the Node.js enviroment, in your own
           * factory, that you can customize the WebSocket client instance.
           * In the factory below, we jump the `maxPayload` size to 200M,
           * this can be useful when streaming really big tables like the
           * `voters` table on EOS.
           *
           * We also add an error logging of errors occurring at the HTTP Upgrade
           * level before turning the connection into a WebSocket connection. This
           * can happens when authorization happens with your API token.
           *
           * **Note** Don't try to override the `onopen`, `onclose`, `onerror`
           * and `onmessage` handler, they are overwritten by the `Socket` instance
           * for its own usage.
           *
           * **Important Web Browser Usage Notice**
           * We are in a Node.js context here, the `WebSocketClient` is a
           * Node.js implementation of WebSocket Protocol. It does not have
           * quite the same API interface, the configuration done below
           * will not work in a Browser environment! Check W3C Browser
           * WebSocket API to see what is accepted as it's second argument.
           *
           * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket#Parameters
           */
          webSocketFactory: async (url: string) => {
            const webSocket = new WebSocketClient(url, {
              handshakeTimeout: 30 * 1000, // 30s
              maxPayload: 200 * 1024 * 1000 * 1000 // 200Mb
            })

            const onUpgrade = (response: IncomingMessage) => {
              console.log("Socket upgrade response status code.", response.statusCode)

              // You need to remove the listener at some point since this factory
              // is called at each re-connection with the remote endpoint!
              webSocket.removeListener("upgrade", onUpgrade)
            }

            webSocket.on("upgrade", onUpgrade)

            return webSocket
          }
        }
      }
    })
  }
  async GetActionStreamAsync(data: GetActionTracesMessageData, onMessage: OnStreamMessage): Promise<Stream> {
    const dispatcher = dynamicMessageDispatcher({
      listening: this.onListening,
      action_trace: this.onAction,
      progress: this.onProgress
    })
    let lastSyncBlockNo = await this.kyubeyTransactionRepository.getLastSyncBlockNo();

    this.stream = await this.dfuseClient.streamActionTraces(
      data,
      dispatcher,
      {
        // You can use the `with_progress` to be sure to commit
        // actions at least each 10 blocks. This is useful if your stream
        // is low traffic so you don't need to wait until next
        // action to commit all changes.
        with_progress: 10,
        start_block: -100
      }
    )

    this.stream.onPostRestart = () => {
      console.log()
      console.log(
        "<============= Stream has re-connected to socket correctly (at latest `mark()`) =============>"
      )
      console.log()

      // Upon a re-connection, we need to clear previously accumulated actions
      this.flushPending()
    }

    console.log("Stream connected, ready to receive messages")

    return this.stream;
  }
  private onListening = async () => {
    console.log("Stream is now listening for action(s)")
  }

  private onProgress = (message: ProgressInboundMessage) => {
    const { block_id, block_num } = message.data

    /**
     * Once a progress message is seen, it means we've seen all messages for
     * block prior it, so le'ts commit until this point.
     */
    console.log()
    console.log("Committing changes due to seeing a message from a progress message")
    this.commit(block_id, block_num)
    //this.commit(block_id, 61006380)
  }

  private onAction = (message: ActionTraceInboundMessage<any>) => {
    /**
     * Once a message from a block ahead of last committed block is seen,
     * commit all changes up to this point.
     */
    const { block_id, block_num, trx_id, trace } = message.data;

    switch (trace.act.name) {
      case "buyreceipt":
        this.kyubeyEosTransactionService.HandlerBuyReceipt(trace.act.data.o, trx_id);
        break;
      case "sellreceipt":
        break;
      case "buymatch":
        break;
      case "sellmatch":
        break;

    }

    if (block_num > this.lastCommittedBlockNum) {
      console.log()
      console.log(
        "Comitting changes due to seeing a message from a block ahead of our last committed block"
      )
      this.commit(block_id, block_num)
    }

    const action = message.data.trace.act
    const { from, to, quantity } = action.data

    console.log(
      `Pending transfer [${from} -> ${to} ${quantity}] @ ${printBlock(block_id, block_num)}`
    )
    this.pendingActions.push(message.data.trace.act)
  }
  private commit(blockId: string, blockNum: number) {
    console.log(`Committing all actions up to block ${printBlock(blockId, blockNum)}`)

    if (this.pendingActions.length > 0) {
      // Here, in your production code, action would be saved in a database, as well as error handling
      this.pendingActions.forEach((action) => this.committedActions.push(action))
    }

    console.log(`Bumping last committed block and clearing pending actions`)
    this.pendingActions = []
    this.lastCommittedBlockNum = blockNum
    //this.lastCommittedBlockNum = 61006380

    /**
     * This is one of the most important call of the example. By marking the stream
     * at the right block, upon restart, the stream will automatically starts back
     * at this block ensuring to never miss a single action.
     */
    console.log(`Marking stream up to block ${printBlock(blockId, blockNum)}`)
    this.ensureStream().mark({ atBlockNum: blockNum })
    //this.ensureStream().mark({ atBlockNum: 62007424 })

    /**
     * In a real-word production code, you would also need to persist the
     * `this.lastCommittedBlockNum` value to ensure that upon a process
     * restart, you start back from this exact value.
     */

    console.log("")
  }
  private ensureStream(): Stream {
    if (this.stream) {
      return this.stream
    }

    throw new Error("Stream should be set at this runtime execution point")
  }
  /**
 * When the stream re-connects, we must flush all our current pending transactions
 * as the stream re-starts at our last marked block, inclusive.
 *
 * Since we mark after commit, anything currently in pending was not committed,
 * hence let's flush all pending actions, dfuse Stream will stream them back.
 */
  public async flushPending() {
    console.log("Flushing pending action(s) due to refresh")
    this.pendingActions = []
  }

  public async stop() {
    await this.ensureStream().close()

    console.log("Committed actions")
    this.committedActions.forEach((action) => {
      const { from, to, quantity } = action.data
      console.log(`- Commit transfer [${from} -> ${to} ${quantity}]`)
    })
  }
  // async SearchTransactionsAsync(
  //   username: string,
  //   opts?: {
  //     startBlock?: number;
  //     sort?: SearchSortType;
  //     blockCount?: number;
  //     limit?: number;
  //     cursor?: string;
  //     withReversible?: boolean;
  //   }): Promise<SearchTransactionsResponse> {
  //   const resp = await this.dfuseClient.searchTransactions(`account:${username} input:true`, opts)
  //   return resp;
  // }
  IsSomeAction(message: InboundMessage, actionName: string) {
    if (message.type === "action_trace") {
      if (message.data.trace.act.name == actionName) {
        return true;
      }
    }
    return false;
  }
}

type KarmaTransfer = {
  from: string
  to: string
  quantity: string
  memo: string,
  account: string,
  ask: string,
  bid: string,
  id: number,
  timestamp: number,
}

function printBlock(blockId: string, blockNum: number): string {
  return `${blockId.slice(0, 8)}...${blockId.slice(-8)} (${blockNum})`
}