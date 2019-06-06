import { NestSchedule } from 'nest-schedule';
export declare class EosTransactionJob extends NestSchedule {
    cronJob(): Promise<void>;
    onceJob(): void;
    intervalJob(): boolean;
}
