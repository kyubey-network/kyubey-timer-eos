export declare type SellReceipt = {
    id: number;
    account: string;
    bid: string;
    ask: string;
    unit_price: number;
    timestamp: number;
};

export declare type BuyReceipt = {
    id: number;
    account: string;
    bid: string;
    ask: string;
    unit_price: number;
    timestamp: number;
};

export declare type BuyMatch = {
    id: number;
    bid: string;
    ask: string;
    unit_price: number;
    timestamp: number;
    asker: string;
    bidder: string;
};

export declare type SellMatch = {
    id: number;
    account: string;
    bid: string;
    ask: string;
    unit_price: number;
    timestamp: number;
    asker: string;
    bidder: string;
};