import SigningPage from "./svelte-component/signingPage.svelte";
import TermsAndConditions from "./svelte-component/TermsAndConditionsPage.svelte";
import WalletConnect from "./svelte-component/WalletConnectPage.svelte";

import type { WalletState } from "@web3-onboard/core";
import { writable, type Writable } from "svelte/store";

export const storeBscAddress: Writable<`0x${string}`> = writable("0x");
export const storeERC1193Provider: Writable<any> = writable();
export const storeXianAddress: Writable<string> = writable("");
export const storeTermsAgreement: Writable<string> = writable("disagree");
export const storePages: Writable<any> = writable([
    WalletConnect,
    TermsAndConditions,
    SigningPage,
]);
export const storeIsParticipant: Writable<boolean> = writable(false);
export const storeParticipantTokens: Writable<number> = writable(0);
export const storeCurrentPageIndex: Writable<number> = writable(0);
