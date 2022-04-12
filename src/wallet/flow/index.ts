import * as fcl from "@onflow/fcl";

class Flow {
  public singer: any;
  public wallet: any;
  public account: any;

  constructor() {
    this.singer = {}
    this.wallet = {}
    this.account = ''

    this.wallet = fcl
    this.wallet.config({
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn", // Endpoint set to Testnet
    })
  }

  // 钱包执行账号登录
  public async login() {

    const account: any = await new Promise((res, rej) => {
      this.wallet.authenticate()
      this.wallet.currentUser.subscribe((user: any) => {
        if (user.loggedIn) {
          res(user)
        }
      })
    })
    this.account = account.addr

    return true
  }

  // 钱包执行账号退出
  public async logout() {}

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {}

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {}
}

export default Flow;