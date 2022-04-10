import * as nearAPI from 'near-api-js'
import nearConfig from './config.json'

interface Options {
  appName: string;
  network: "mainnet" | "testnet";
}
class Near {
  public signer: any;
  public wallet: any;
  public account: any;
  public appName: string;
  public network: "mainnet" | "testnet";

  constructor({ appName, network }: Options) {
    // 初始化
    this.signer = {};
    this.wallet = {};
    this.account = "";
    this.appName = appName;
    this.network = network;
  }

 	// 钱包执行账号登录
	public async login() {
    try {
      const { connect, keyStores, WalletConnection } = nearAPI;
      const near_config = nearConfig[this.network]
      const config: any = {
        ...near_config,
        headers: {},
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      };
  
      // connect to NEAR
      const near = await connect(config);
  
      // create wallet connection
      this.wallet = new WalletConnection(near, this.appName);
      const account = this.wallet.account()

      // If not signed in redirect to the NEAR wallet to sign in
      // keys will be stored in the BrowserLocalStorageKeyStore
      if (!account.accountId) {
        this.wallet.requestSignIn()
        return false
      }

      // signer实例
      this.signer = near.connection.signer

      // 默认账号
      this.account = account.accountId;

      // 授权过程完毕
      return true;
    } catch (error: any) {
      throw error;
    }
  }

  // 钱包执行账号退出
  public async logout() {
    this.wallet.signOut()
  }

  // 钱包监听账号变化
  public onAccountsChanged(callBack: Function) {
    // this.wallet.on("accountsChanged", ([account]: string[]) =>
    //   callBack(account),
    // );
  }

  // 钱包监听网络变化
  public onChainChanged(callBack: Function) {
    // this.wallet.on("networkChanged", callBack);
  }
}

export default Near;
