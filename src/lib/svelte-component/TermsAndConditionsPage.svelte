<script>

    import { storeCurrentPageIndex, storeTermsAgreement } from "$lib/store";

</script>
<div class="scrollable-container">
    <strong>Terms and Conditions - Crypto Services</strong>

    <p>These Terms and Conditions ("Agreement") govern the use of crypto-related services provided by [Your Company Name] ("Provider") to the user ("User"). By accessing or using the crypto services, the User agrees to be bound by this Agreement. If the User does not agree with any part of this Agreement, they should refrain from using the services.</p>

    <strong>1. Acceptance of Terms</strong>

    <p>By using the crypto services, the User acknowledges that they have read, understood, and agreed to comply with this Agreement, including any future updates or modifications. The User also agrees to comply with all applicable laws and regulations.</p>

    <strong>2. Crypto Services</strong>

    <p>2.1 The Provider offers crypto-related services, including but not limited to crypto wallet management, crypto exchange, and crypto trading.</p>

    <p>2.2 The User understands that the crypto market is highly volatile, and the Provider does not guarantee any specific financial outcomes. The User agrees to bear all risks associated with crypto transactions.</p>

    <p>2.3 The User acknowledges that the Provider may impose limitations or restrictions on the use of crypto services, including but not limited to transaction limits, withdrawal limits, or account verification requirements.</p>

    <strong>3. User Responsibilities</strong>

    <p>3.1 The User is solely responsible for maintaining the security and confidentiality of their account credentials, including private keys, passwords, and other authentication information. The User agrees not to share their account information with any third party.</p>

    <p>3.2 The User must ensure that all information provided to the Provider is accurate, complete, and up to date. The User agrees to promptly notify the Provider of any changes to their information.</p>

    <p>3.3 The User agrees not to use the crypto services for any illegal, fraudulent, or unauthorized purposes. The User shall comply with all applicable laws, regulations, and guidelines.</p>

    <strong>4. Intellectual Property</strong>

    <p>4.1 All intellectual property rights related to the crypto services, including but not limited to trademarks, logos, and software, are the property of the Provider or its licensors. The User agrees not to use, modify, reproduce, or distribute any intellectual property without the explicit consent of the Provider.</p>

    <strong>5. Termination</strong>

    <p>5.1 The Provider reserves the right to suspend, terminate, or modify the crypto services at any time, with or without notice, for any reason or no reason. The Provider shall not be liable to the User or any third party for any such modifications, suspensions, or terminations.</p>

    <p>5.2 The User may terminate their use of the crypto services at any time by closing their account and ceasing to use the services.</p>

    <strong>6. Disclaimer of Liability</strong>

    <p>6.1 The Provider shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from the use or inability to use the crypto services, including but not limited to financial losses, loss of data, or interruption of business.</p>

    <p>6.2 The User acknowledges that the Provider is not responsible for any third-party services, products, or websites linked or integrated with the crypto services. The User agrees to review and accept the terms and policies of any third-party services before using them.</p>

    <strong>7. Governing Law and Jurisdiction</strong>

    <p>This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from or relating to this Agreement shall be exclusively subject to the jurisdiction of the courts of [Jurisdiction].</p>

    <strong>8. Amendments</strong>

    <p>The Provider reserves the right to modify or update this Agreement at any time. The User is responsible for regularly reviewing this Agreement to stay informed of any changes. Continued use of the crypto services after any modifications constitutes acceptance of the updated Agreement.</p>

    <p>By using the crypto services, the User acknowledges that they have read and understood this Agreement and agree to be bound by its terms and conditions.</p>

    <p>This document constitutes the entire agreement between the User and the Provider regarding the crypto services.</p>

    <p>Last updated: 6th July 2024</p>

    <p>Xian Network</p>
    <p>[Your Company Address]</p>

</div>
{#if $storeTermsAgreement === "disagree"}
    <div>
        <button on:click={()=>{storeTermsAgreement.set("agree")}}>agree to terms</button>
    </div>
{:else}
    <div style="height: 20.86px;"></div>
{/if}

<div>
    {#if $storeTermsAgreement === "agree"}
        <div class="back-next-button">
            <div >
                <button on:click={()=>{storeCurrentPageIndex.set(0)}}>Back</button>
            </div>
            <div >
                <button on:click={()=>{storeCurrentPageIndex.set(2)}}>Next</button>
            </div>
        </div>
    {:else}
        <div class="back-button">
            <div >
                <button on:click={()=>{storeCurrentPageIndex.set(0)}}>Back</button>
            </div>
        </div>
    {/if}
</div>
<style>
    .scrollable-container {
        height: 200px; /* Set the fixed height */
        width: 400px; /*Set the width as needed */
        overflow-y: auto; /* Enable vertical scrolling */
        border: 1px solid #ccc; /* Optional: adds a border for visibility */
        padding: 10px; /* Optional: adds some inner spacing */
    }
    .back-next-button{
        display: flex;
        /* flex-direction: column; */
        justify-content: space-between;
        width: 400px;
        
    }
    .back-button{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 400px;
    }
</style>