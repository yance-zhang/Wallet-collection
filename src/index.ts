import waxio from "./wallet/waxio";
import sollet from "./wallet/sollet";
import portis from "./wallet/portis";
import phantom from "./wallet/phantom";
import metamask from "./wallet/metamask";
import fortmatic from "./wallet/fortmatic";
import walletlink from "./wallet/walletlink";
import walletconnect from "./wallet/walletconnect";
import harmony from "./wallet/harmony/wallet";
import kardia from "./wallet/kardia/wallet";
import klaytn from "./wallet/klaytn/wallet";
import near from "./wallet/near/wallet";
import flow from "./wallet/flow";

class Wallet {
  // 当前注册的钱包
  public use: string;

  // 全部支持的钱包
  public wallets: any = {
    waxio,
    sollet,
    portis,
    phantom,
    metamask,
    fortmatic,
    walletlink,
    walletconnect,
    harmony,
    kardia,
    klaytn,
    near,
    flow,
  };

  constructor(name: string, config?: object) {
    // 初始化
    this.use = name;

    // 替换默认类的实例对象
    return new this.wallets[this.use](config);
  }
}

export default Wallet;
