import type { IWalletInfo } from "./xian-dapp-interface";
import { storeXianAddress } from "./store";

export const handleWalletInfo = (info: IWalletInfo) => {
    if (info.locked) {
        //storeXianAddress.set('Wallet is Locked');
        //showToast("Your wallet is locked. Please unlock it to interact with the dapp.", "is-warning");
        console.log(
            "Your wallet is locked. Please unlock it to interact with the dapp.",
        );
    } else {
        storeXianAddress.set(info.address);
        // console.log(info.address);
    }
};

export const handleWalletError = () => {
    //showToast("You don't have the Xian Wallet extension installed. Please install it to interact with the dapp.", "is-danger");
    //storeXianAddress.set('Wallet not installed');
    return "Wallet not installed";
    console.log("Wallet not installed");
};
