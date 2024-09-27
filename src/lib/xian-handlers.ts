import type { IWalletInfo } from "./xian-dapp-interface";
import { storeXianAddress, xianWalletState } from "./store";

export const handleWalletInfo = (info: IWalletInfo) => {
    // if (info.locked) {
    //     //storeXianAddress.set('Wallet is Locked');
    //     //showToast("Your wallet is locked. Please unlock it to interact with the dapp.", "is-warning");
    //     console.log(
    //         "Your wallet is locked. Please unlock it to interact with the dapp.",
    //     );
    // } else {
    storeXianAddress.set(info.address);
    xianWalletState.set({ ...info });
    // console.log(info.address);
    // }
};

export const handleWalletError = () => {
    return xianWalletState.set({
        error: "wallet_not_installed"
    })
};
