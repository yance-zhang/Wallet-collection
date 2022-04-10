import { providers } from "ethers";

class Klaytn {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor() {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";

    // 内置提供者
    const Window: any = globalThis;
    const klaytn = Window.klaytn;

    // 有可能被其他提供者覆盖
    this.wallet = klaytn;
  }

 	// 钱包执行账号登录
	public async login() {
    try {
      const Window: any = globalThis;
      if (!Window.klaytn) {
        throw new Error("Please check your Chrome Extension for Klaytn");
      }
      // 授权
      const accounts = await this.wallet.enable();
			const account = accounts[0];

      // signer实例
      const provider = new providers.Web3Provider(this.wallet);
      this.signer = provider.getSigner();

      // 默认账号
      this.account = account;

      // 授权过程完毕
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {}

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {
    this.wallet.on("accountsChanged", ([account]: string[]) =>
      callBack(account),
    );
  }

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {
    this.wallet.on("networkChanged", callBack);
  }
}

export default Klaytn;
