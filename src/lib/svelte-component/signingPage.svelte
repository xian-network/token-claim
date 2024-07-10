<script>
    import { toast } from 'svoast';
    import { getAddress } from "viem";

    import { signMessage, recordParticipantData } from "$lib/action";
    import { storeBscAddress, storeCurrentPageIndex, storeTermsAgreement, storeXianAddress } from "$lib/store";
    import { get } from "svelte/store";

    let otherXianAddress = "";

    const signThisXianAddress = async ()=>{
		const bscWallet = get(storeBscAddress);
		const xianWallet = $storeXianAddress;
		const agreedToTerms = $storeTermsAgreement;

		const signature = await signMessage(xianWallet)

		const result = await recordParticipantData(bscWallet, xianWallet, signature, agreedToTerms)	
        //@ts-ignore
        if (result === "signing successfull"){
            toast.success(result);
        } else {
            //@ts-ignore
            toast.info(result);
        }
	}

    const signOtherXianAddress = async ()=>{
		const bscWallet = get(storeBscAddress); 
		const xianWallet = otherXianAddress.trim();
		const agreedToTerms = $storeTermsAgreement;

		const signature = await signMessage(xianWallet)
		
		const result = await recordParticipantData(bscWallet, xianWallet, signature, agreedToTerms)
        //@ts-ignore
        if (result === "signing successfull"){
            toast.success(result);
        } else {
            //@ts-ignore
            toast.info(result);
        }
	}

</script>
<div class="container">
    <div>
        <button on:click={signThisXianAddress}>sign this xian wallet address</button>
    </div>
    <p>OR</p>
    <div>
        sign other xian wallet address
        <div>
            <input type="text" placeholder="paste other xian address here" bind:value={otherXianAddress}>
        </div>
        
    </div>
    <div>
        <button on:click={signOtherXianAddress}>sign</button>
    </div>
    <div class="back-button">
        <div>
            <button on:click={()=>{storeCurrentPageIndex.set(1)}}>Back</button>
        </div>
        
    </div>
    
</div>
<style>
    .container{
        width: 400px;
        
    }
    .back-button{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>