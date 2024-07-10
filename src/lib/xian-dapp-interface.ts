export interface IWalletInfo {
    address: string;
    locked: boolean;
}

interface ISignMessageResponse {
    signature: string;
}

interface ITransactionResponse {
    txid: string;
}

interface ITransactionResult {
    result: {
        tx_result: {
            data: string;
        };
        tx: string;
    };
}

interface IParsedTransactionData {
    original_tx: any;
}

export interface IXianWalletUtils {
    rpcUrl: string;
    isWalletReady: boolean;
    initialized: boolean;
    state: {
        walletReady: {
            isReady: boolean;
            resolvers: (() => void)[];
        };
        walletInfo: {
            requests: ((info: IWalletInfo) => void)[];
        };
        signMessage: {
            requests: ((response: ISignMessageResponse) => void)[];
        };
        transaction: {
            requests: ((
                response: ITransactionResponse | IParsedTransactionData | null,
            ) => void)[];
        };
    };

    init: (rpcUrl?: string) => void;
    waitForWalletReady: () => Promise<void>;
    requestWalletInfo: () => Promise<IWalletInfo>;
    signMessage: (message: string) => Promise<ISignMessageResponse>;
    sendTransaction: (
        contract: string,
        method: string,
        kwargs: any,
    ) => Promise<ITransactionResponse | IParsedTransactionData | null>;
    getTxResults: (txHash: string) => Promise<ITransactionResult>;
    getBalanceRequest: (
        address: string,
        contract: string,
    ) => Promise<string | number>;
    getBalance: (contract: string) => Promise<string | number>;
    getApprovedBalanceRequest: (
        token_contract: string,
        address: string,
        approved_to: string,
    ) => Promise<string | number>;
    getApprovedBalance: (
        token_contract: string,
        approved_to: string,
    ) => Promise<string | number>;
    getTxResultsAsyncBackoff: (
        txHash: string,
        retries?: number,
        delay?: number,
    ) => Promise<ITransactionResult>;
    hexToString: (hex: string) => string;
}
