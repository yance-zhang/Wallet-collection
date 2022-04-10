import { providers } from "ethers";
import { HarmonyExtension } from '@harmony-js/core/dist/index.js';

class Harmony {
  public signer: any;
  public wallet: any;
  public account: any;

  constructor() {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";
  }

 	// 钱包执行账号登录
	public async login() {
    try {
      const Window: any = globalThis;
      if (!Window.onewallet) {
        throw new Error("Please check your Chrome Extension for Harmony");
      }
      this.wallet = await new HarmonyExtension(Window.onewallet);
      // 授权
      const accounts = await this.wallet.login();
      // signer实
      const provider = new providers.Web3Provider(this.wallet.provider);
      this.signer = provider.getSigner();

      // 默认账号
      this.account = accounts.address;

      // 授权过程完毕
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {
    this.wallet.logout()
  }

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {
    // this.wallet.wallet.on("accountsChanged", ([account]: string[]) =>
    //   callBack(account),
    // );
  }

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {
    // this.wallet.wallet.on("networkChanged", callBack);
  }
}

export default Harmony;
