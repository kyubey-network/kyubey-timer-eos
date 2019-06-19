import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import * as querystring from 'querystring';

@Injectable()
export class DfuseApiService {
    private apiKey = "server_816baafdc4bf9429fe0554ef0f5168f2";
    private baseAuthUrl = "https://auth.dfuse.io";
    private baseEosUrl = "https://mainnet.eos.dfuse.io";
    private jwtToken: string;
    private jwtTokenExpiresAt = 0;
    constructor() {
    }
    public async GetKyubeyHistoryAsync(limit: number, startBlock: number) {
        const req = await this.GetRequestInstanceAsync();
        //sellmatch|sellreceipt|buymatch|buyreceipt|addfav|removefav|clean|cancelsell|cancelbuy
        try {
            let responseResult = await req.post('/v0/search/transactions', querystring.stringify({
                start_block: startBlock,
                limit,
                sort: "ASC",
                with_reversible: false,
                q: "receiver:kyubeydex.bp (action:sellmatch OR action:sellreceipt OR action:buymatch OR action:buyreceipt OR action:addfav OR action:removefav OR action:clean OR action:cancelsell OR action:cancelbuy)"
            }));
            return responseResult.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    private async CheckJwtAsync() {
        if (new Date() > new Date(this.jwtTokenExpiresAt)) {
            await this.RefreshJwtAsync()
        }
    }
    private async GetRequestInstanceAsync() {
        await this.CheckJwtAsync();
        const instance = axios.create({
            baseURL: this.baseEosUrl,
            headers: {
                'Authorization': `Bearer ${this.jwtToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return instance;
    }
    private async RefreshJwtAsync() {
        try {
            let responseResult = await axios.post<IssueRequest, AxiosResponse<IssueReponse>>(this.baseAuthUrl + '/v1/auth/issue', {
                api_key: this.apiKey
            });
            this.jwtToken = responseResult.data.token;
            this.jwtTokenExpiresAt = responseResult.data.expires_at;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
}

type IssueRequest = {
    api_key: string;
}

type IssueReponse = {
    token: string;
    expires_at: number;
}