<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { Toasts } from 'svoast';
	import { getAddress } from "viem";
	 
	import { 
		storeBscAddress, 
		storeIsParticipant, 
		storeCurrentPageIndex, 
		storeERC1193Provider, 
		storePages, 
		storeParticipantTokens 
	} from '$lib/store';
	import onboard from '$lib/web3-onboard';
	import type { IWalletInfo } from "$lib/xian-dapp-interface"
	import XianWalletUtils from "$lib/xian-dapp-utils";
	import { handleWalletError, handleWalletInfo } from '$lib/xian-handles';
	import { isPrivateSaleParticipant, PrivateSaleParticipantTokenAmount } from '$lib/action';

	$: currentPage = $storePages[$storeCurrentPageIndex];

	onMount(async ()=>{
        XianWalletUtils.init('https://testnet.xian.org');
        //@ts-ignore
        const info: IWalletInfo = await XianWalletUtils.requestWalletInfo()
		.catch(handleWalletError);
		handleWalletInfo(info);
    });

	afterUpdate(()=>{
		const wallets = onboard.state.select('wallets')
		wallets.subscribe((update)=>{	
			if(update[0]){
				const checksumAddress = getAddress(update[0]?.accounts[0]?.address);
				storeBscAddress.set(checksumAddress);
				storeERC1193Provider.set(update[0].provider);
				const truncAddress = checksumAddress.slice(0, 10) + "..." + checksumAddress.slice(-9);
	
				isPrivateSaleParticipant(truncAddress)
				.then((isParticipant)=>{
					storeIsParticipant.set(isParticipant);
				})
				// @ts-ignore
				.catch((err)=>console.error(err));
				
				PrivateSaleParticipantTokenAmount(truncAddress)
				.then((amountToReceive)=>{
					storeParticipantTokens.set(amountToReceive[0]?.amountToReceive);
				})
				.catch((err)=>console.error(err));
			} 
		})
	})

</script>

<main class="main">
	<Toasts position="top-center"/>
	<h1>Xian RCNET Token Claim</h1>
	<svelte:component this={currentPage}/>
</main>
  
  <style>
	.main {
	  display: flex;
	  flex-flow: column;
	  align-items: center;
	  justify-items: center;
	  text-align: center;
	  height: 100vh;
	}
  </style>