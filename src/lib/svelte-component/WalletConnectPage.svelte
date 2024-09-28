<script lang="ts">
    import { get } from "svelte/store";
    import { getAddress } from "viem";

    import {
        isPrivateSaleParticipant,
        PrivateSaleParticipantTokenAmount,
        isNotSigned
    } from "$lib/action";
    import {
        storeCurrentPageIndex,
        storeBscAddress,
        storeIsParticipant,
        storeParticipantTokens,
        xianWalletState,
        storeIsNotSigned,
    } from "$lib/store";
    import onboard from "$lib/web3-onboard";

    const wallets$ = onboard.state.select("wallets");

    const truncateAddress = (address: string) => {
        return address.slice(0, 10) + "..." + address.slice(-9);
    };

    const connectBSCWallet = async () => {
        const wallets = await onboard.connectWallet();
        const wallet = wallets[0]?.accounts[0]?.address;
        const bscWallet = getAddress(wallet);
        const isParticipant = await isPrivateSaleParticipant(
            bscWallet,
        ).catch((err) => console.error(err));

        storeIsParticipant.set(isParticipant);

        const amountToReceive = await PrivateSaleParticipantTokenAmount(
            bscWallet,
        ).catch((err) => console.error(err));

        storeParticipantTokens.set(amountToReceive[0].amountToReceive);
        const notSigned = await isNotSigned(bscWallet).catch((err) => console.error(err));
        storeIsNotSigned.set(notSigned);
        if (!notSigned) {
            storeCurrentPageIndex.set(4);
        }
    };

    const disconnectBSCWallet = () => {
        onboard.disconnectWallet({ label: $wallets$?.[0]?.label });
        storeBscAddress.set("0x");
        storeIsParticipant.set(false);
        storeParticipantTokens.set(0);
        storeIsNotSigned.set(true);
    };
</script>

<div class="container">
    <div class="wallet-containers">
        <div class="xian-wallet-container connect-section">
            <div class="heading">1. Connect Xian Wallet</div>
            {#if $xianWalletState?.address && !$xianWalletState?.locked}
                <div class="success-message">
                    Xian wallet connected.
                </div>
                <div>
                    {truncateAddress($xianWalletState.address)}
                </div>
                {:else if $xianWalletState?.locked}
                <div>
                    Xian wallet is locked
                </div>
            {:else if $xianWalletState?.error === "wallet_not_installed"}
                <div class="error-message">
                    You don't have the Xian Wallet extension installed. <br />
                </div>
                    Please install from <a
                        href="https://chromewebstore.google.com/search/xian"
                        target="_blank"
                        rel="noopener noreferrer">the chrome app store</a
                    > to proceed.
            {:else}
                Looking for Xian Wallet
            {/if}
        </div>
        <div class="eth-wallet-container connect-section">
            <div class="heading">2. Connect Ethereum Wallet</div>
            {#if $storeBscAddress !== "0x"}
                <div class="success-message">
                    Ethereum wallet connected.
                </div>
                <div>
                    {truncateAddress($storeBscAddress)}
                </div>
                <div>
                    <button on:click={disconnectBSCWallet}>Disconnect</button>
                </div>
                <div>
                    <p>
                        {#if $storeIsParticipant}
                            <p>
                                Tokens Due: {$storeParticipantTokens === undefined
                                    ? 0
                                    : $storeParticipantTokens} XIAN
                            </p>
                        {:else}
                            <p>
                                The connected Ethereum wallet is not due any tokens.
                            </p>
                        {/if}
                    </p>
                </div>
            {:else}
                <div>
                    <button on:click={connectBSCWallet}
                        >Connect Ethereum Wallet</button
                    >
                </div>
            {/if}
        </div>
    </div>
    {#if $xianWalletState?.address && $storeParticipantTokens}
        <div class="next-button">
            <div>
                <button
                    on:click={() => {
                        storeCurrentPageIndex.set(1);
                    }}>Next</button
                >
            </div>
        </div>
    {/if}
</div>

<style>
    .error-message {
        color: red;
    }
    .success-message {
        color: green;
    }

    .heading {
        width: 100%;
        text-align: left;
        font-size: 1.2rem;
        padding-bottom: 1.3rem;
        font-weight: 800;
        /* text-decoration: underline; */
    }
    .connect-section {
        margin-bottom: 2rem;
        border: 1px solid #f2f2f2;
        padding: 1rem;
    }
    .container {
        line-height: 2rem;
        width: 100%;
        max-width: 450px;
        padding-bottom: 10rem;
    }
    .next-button {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
</style>
