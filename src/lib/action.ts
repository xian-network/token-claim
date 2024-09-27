import { createWalletClient, custom, getAddress } from "viem";
import { storeERC1193Provider, storeBscAddress } from "./store";
import { get } from "svelte/store";

export const signMessage = async (message: string): Promise<`0x${string}`> => {
    const bscWallet = get(storeBscAddress);
    const provider = get(storeERC1193Provider);

    if (!bscWallet || !provider) {
        throw new Error("Wallet not connected");
    }

    const walletClient = createWalletClient({
        account: bscWallet,
        transport: custom(provider),
    });

    try {
        const signature = await walletClient.signMessage({
            account: bscWallet,
            message: message,
        });
        return signature;
    } catch (error) {
        console.error("Error signing message:", error);
        throw error;
    }
};

//DB API

export const recordParticipantData = async (
    bscWallet: `0x${string}`,
    xianWallet: string,
    signature: void | `0x${string}`,
    agreedToTerms: string,
) => {
    const response = await fetch("/api/record-data", {
        method: "POST",
        body: JSON.stringify({
            bscWallet,
            xianWallet,
            signature,
            agreedToTerms,
        }),
        headers: {
            "content-type": "application/json",
        },
    });

    return await response.json();
};

export const isPrivateSaleParticipant = async (bscWallet: string) => {
    const response = await fetch("/api/is-participant", {
        method: "POST",
        body: JSON.stringify({ bscWallet }),
        headers: {
            "content-type": "application/json",
        },
    });

    return await response.json();
};

export const isNotSigned = async (bscAddress: string) => {
    const response = await fetch("/api/is-not-signed", {
        method: "POST",
        body: JSON.stringify({ bscAddress }),
        headers: {
            "content-type": "application/json",
        },
    });

    return await response.json();
};

export const PrivateSaleParticipantTokenAmount = async (
    truncBscWallet: string,
) => {
    const response = await fetch("/api/participant-token-amount", {
        method: "POST",
        body: JSON.stringify({ truncBscWallet }),
        headers: {
            "content-type": "application/json",
        },
    });

    return await response.json();
};
