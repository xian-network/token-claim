<script>
    import { get } from "svelte/store";
    import { getAddress } from "viem";

    import { isPrivateSaleParticipant, PrivateSaleParticipantTokenAmount } from "$lib/action";
    import { storeCurrentPageIndex, storeBscAddress, storeIsParticipant, storeParticipantTokens, storeXianAddress } from "$lib/store";
    import onboard from "$lib/web3-onboard";

    const wallets$ = onboard.state.select('wallets');

    const connectBSCWallet = async () => {
        const wallets = await onboard.connectWallet()
        const wallet = wallets[0]?.accounts[0]?.address
		const bscWallet = getAddress(wallet); //get checksum address
        const truncAddress = bscWallet.slice(0, 10) + "..." + bscWallet.slice(-9);

		// @ts-ignore
		const isParticipant = await isPrivateSaleParticipant(truncAddress)
		.catch((err)=>console.error(err));

        storeIsParticipant.set(isParticipant);
        
        const amountToReceive = await PrivateSaleParticipantTokenAmount(truncAddress)
        .catch((err)=>console.error(err));

        storeParticipantTokens.set(amountToReceive[0].amountToReceive)
    }

    const disconnectBSCWallet = () => {
        onboard.disconnectWallet({ label: $wallets$?.[0]?.label })
        storeBscAddress.set("0x");
    }
</script>
<div class="container">
    <div>
        <div style="padding: 10px; height: 47px">
            {#if $storeXianAddress}
                <div>
                    xian wallet connected
                    <div>{$storeXianAddress.slice(0, 6) + "..." + $storeXianAddress.slice(-6)}</div>
                </div>
            {:else}
            <div>You don't have the Xian Wallet extension installed. Please install from <a href="https://chromewebstore.google.com/search/xian" target="_blank" rel="noopener noreferrer">here</a></div>
            {/if}
        </div>
        <div style="padding: 10px; height: 135px; border-top: 2px dashed black;">
            {#if $storeBscAddress !== "0x"}
                <div>
                    Ethereum wallet connected
                    <div>{$storeBscAddress.slice(0, 10) + '...' + $storeBscAddress.slice(-9)}</div>
                </div>
                <div>
                    <button on:click={disconnectBSCWallet}>disconnect</button>
                </div>
                <div>
                    <p>Private sale participant: {$storeIsParticipant? "yes": "no"}</p>
                    <p>Tokens: {$storeParticipantTokens === undefined? 0: $storeParticipantTokens} XIAN</p>
                </div>

            {:else}
                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                    <button on:click={connectBSCWallet}>connect ethereum wallet</button>
                </div>
            {/if}
        </div>
    </div>
    {#if storeXianAddress && $storeIsParticipant}
        <div class="next-button">
            <div>
                <button on:click={()=>{storeCurrentPageIndex.set(1)}}>Next</button>
            </div>
        </div>
    {/if}
</div>

<style>
    .container{
        /* border-top: 2px dashed black; */
        border-bottom: 2px dashed black;
        /* height: 132px; */
        width: 400px;
    }
    .next-button{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        
    }

</style>