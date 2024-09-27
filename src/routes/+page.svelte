<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import { Toasts } from "svoast";
    import { getAddress } from "viem";

    import {
        storeBscAddress,
        storeIsParticipant,
        storeCurrentPageIndex,
        storeERC1193Provider,
        storePages,
        storeParticipantTokens,
        storeIsNotSigned,
    } from "$lib/store";
    import onboard from "$lib/web3-onboard";
    import type { IWalletInfo } from "$lib/xian-dapp-interface";
    import XianWalletUtils from "$lib/xian-dapp-utils";
    import { handleWalletError, handleWalletInfo } from "$lib/xian-handlers";
    import {
    isNotSigned,
        isPrivateSaleParticipant,
        PrivateSaleParticipantTokenAmount,
    } from "$lib/action";

    $: currentPage = $storePages[$storeCurrentPageIndex];

    onMount(async () => {
        XianWalletUtils.init("https://testnet.xian.org");
        //@ts-ignore
        const info: IWalletInfo =
            await XianWalletUtils.requestWalletInfo().catch(handleWalletError);
        console.log({ info });
        handleWalletInfo(info);
    });

    afterUpdate(() => {
        const wallets = onboard.state.select("wallets");
        wallets.subscribe((update) => {
            if (update[0]) {
                const checksumAddress = getAddress(
                    update[0]?.accounts[0]?.address,
                );

                storeBscAddress.set(checksumAddress);
                storeERC1193Provider.set(update[0].provider);

                isPrivateSaleParticipant(checksumAddress)
                    .then((isParticipant) => {
                        storeIsParticipant.set(isParticipant);
                    })
                    // @ts-ignore
                    .catch((err) => console.error(err));

                isNotSigned(checksumAddress.toLowerCase())
                    .then((notSigned) => {
                        storeIsNotSigned.set(notSigned);
                        if (!notSigned) {
                            storeCurrentPageIndex.set(3);
                        }
                    })
                    // @ts-ignore
                    .catch((err) => console.error(err));

                PrivateSaleParticipantTokenAmount(checksumAddress)
                    .then((amountToReceive) => {
                        storeParticipantTokens.set(
                            amountToReceive[0]?.amountToReceive,
                        );
                    })
                    .catch((err) => console.error(err));
            }
        });
    });
</script>

<main class="main">
    <Toasts position="top-center" />
    <img id="xian-logo" src="/images/xian-white.svg" alt="xian logo">
    <h1>Xian RCNET Token Claim</h1>
    <svelte:component this={currentPage} />
</main>

<style>
    .main {
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-items: center;
        text-align: center;
        min-height: 100vh;
		background-color: #202020
    }

    #xian-logo {
        width: 100px;
        height: 100px;
        margin-top: 20px;
    }
</style>
