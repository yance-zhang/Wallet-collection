import * as fcl from "@onflow/fcl";
const flow_onfig = {
    mainnet: "https://fcl-discovery.onflow.org/mainnet/authn",
    testnet: "https://fcl-discovery.onflow.org/testnet/authn"
};
class Flow {
    constructor({ network }) {
        this.singer = {};
        this.wallet = {};
        this.account = '';
        this.wallet = fcl;
        this.wallet.config({
            "discovery.wallet": flow_onfig[network],
        });
    }
    // 钱包执行账号登录
    async login() {
        const account = await new Promise((res, rej) => {
            this.wallet.authenticate();
            this.wallet.currentUser.subscribe((user) => {
                if (user.loggedIn) {
                    res(user);
                }
            });
        });
        this.account = account.addr;
        return true;
    }
    // 钱包执行账号退出
    async logout() { }
    // 钱包监听账号变化
    onAccountsChanged(callBack) { }
    // 钱包监听网络变化
    onChainChanged(callBack) { }
}
export default Flow;
