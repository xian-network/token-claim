<script>
  import { toast } from "svoast";
  import { getAddress } from "viem";

  import { signMessage, recordParticipantData } from "$lib/action";
  import {
    storeBscAddress,
    storeCurrentPageIndex,
    storeTermsAgreement,
    storeXianAddress,
  } from "$lib/store";
  import { get } from "svelte/store";

  let otherXianAddress = "";

  const signThisXianAddress = async () => {
    const bscWallet = get(storeBscAddress);
    const xianWallet = $storeXianAddress;
    const agreedToTerms = $storeTermsAgreement;

    const signature = await signMessage(xianWallet);

    const result = await recordParticipantData(
      bscWallet,
      xianWallet,
      signature,
      agreedToTerms,
    );
    //@ts-ignore
    if (result === "signing successfull") {
      toast.success(result);
      console.log("setting page to success");
      storeCurrentPageIndex.set(3);
    } else {
      //@ts-ignore
      toast.info(result);
    }
  };
</script>

<div class="container">
  <div class="step-container">
    <div class="heading">4. Sign and Submit</div>
    <div class="explanation">
      <p>
        Sign your Xian address using the your ETH address to prove ownership. <br
        />
      </p>
      <p>
        Once submitted, you should receive the tokens to your Xian wallet within
        24 hours.
      </p>
    </div>
    <div class="sign-button">
      <button class="btn variant-filled-tertiary" on:click={signThisXianAddress}
        >Sign and Submit</button
      >
    </div>
  </div>
  <div class="back-button">
    <div>
      <button
        on:click={() => {
          storeCurrentPageIndex.set(1);
        }}>Back</button
      >
    </div>
  </div>
</div>

<style>
  .step-container {
    border: 1px solid #f2f2f2;
    padding: 1rem;
  }
  .heading {
    width: 100%;
    max-width: 450px;
    padding-bottom: 1rem;
    text-align: left;
    font-size: 1.2rem;
    font-weight: 800;
    /* text-decoration: underline; */
  }
  .sign-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 0rem;
  }
  .container {
    /* width: 400px; */
    max-width: 450px;
    padding: 1rem;
  }
  .back-button {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
