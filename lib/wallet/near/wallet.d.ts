interface Options {
    appName: string;
    network: "mainnet" | "testnet";
}
declare class Near {
    signer: any;
    wallet: any;
    account: any;
    appName: string;
    network: "mainnet" | "testnet";
    constructor({ appName, network }: Options);
    login(): Promise<boolean>;
    logout(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Near;
