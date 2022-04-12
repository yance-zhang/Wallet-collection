interface Props {
    network: "mainnet" | "testnet";
}
declare class Flow {
    singer: any;
    wallet: any;
    account: any;
    constructor({ network }: Props);
    login(): Promise<boolean>;
    logout(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
}
export default Flow;
