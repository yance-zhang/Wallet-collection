import * as nearAPI from 'near-api-js';
const NC = {
    mainnet: {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org"
    },
    testnet: {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org"
    }
};
class Near {
    constructor({ appName, network }) {
        // 初始化
        this.signer = {};
        this.wallet = {};
        this.account = "";
        this.appName = appName;
        this.network = network;
    }
    // 钱包执行账号登录
    async login() {
        try {
            const { connect, keyStores, WalletConnection } = nearAPI;
            const near_config = NC[this.network];
            const config = {
                ...near_config,
                headers: {},
                keyStore: new keyStores.BrowserLocalStorageKeyStore(),
            };
            // connect to NEAR
            const near = await connect(config);
            // create wallet connection
            this.wallet = new WalletConnection(near, this.appName);
            const account = this.wallet.account();
            // If not signed in redirect to the NEAR wallet to sign in
            // keys will be stored in the BrowserLocalStorageKeyStore
            if (!account.accountId) {
                this.wallet.requestSignIn();
                return false;
            }
            // signer实例
            this.signer = near.connection.signer;
            // 默认账号
            this.account = account.accountId;
            // 授权过程完毕
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    // 钱包执行账号退出
    async logout() {
        this.wallet.signOut();
    }
    // 钱包监听账号变化
    onAccountsChanged(callBack) {
        // this.wallet.on("accountsChanged", ([account]: string[]) =>
        //   callBack(account),
        // );
    }
    // 钱包监听网络变化
    onChainChanged(callBack) {
        // this.wallet.on("networkChanged", callBack);
    }
}
export default Near;
