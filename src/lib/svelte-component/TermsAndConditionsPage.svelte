<script>
    import { storeCurrentPageIndex, storeTermsAgreement } from "$lib/store";
</script>
<div class="heading">3. Terms and Conditions</div>

<div class="scrollable-container">
    <h1>Terms of Service</h1>

    <p>Dear Xian Community Members,</p>

    <h2>1. Introduction</h2>
    <p>
        Welcome to Project Xian. These Terms of Service ("Agreement") govern your participation in the Xian ecosystem, including the airdrop of XIAN tokens. By participating, you agree to be bound by the terms outlined herein. If you do not agree with any part of this Agreement, you must refrain from continuing with this token claim process.
    </p>

    <h2>2. AirDrop in Connection with Participatory Stake</h2>
    <p>
        The airdrop of XIAN tokens is exclusively offered to active participants of the Lamden & Xian community who commit to contributing a participatory stake within the Project Xian ecosystem. This participatory stake is not an issuance of securities or any form of investment opportunity.
    </p>

    <h3>2.1 Purpose of XIAN Tokens</h3>
    <p>
        XIAN tokens are intended to enable and secure decentralized access, participation, and contribution within the Xian network. They are not designed to serve as a source of financial appreciation or profit.
    </p>

    <h3>2.2 Call to Action</h3>
    <p>
        The airdrop serves as an invitation for community members to actively participate in building the new Xian network. By accepting the airdrop, you commit to leveraging your experience and contributing to the development and governance of the ecosystem.
    </p>

    <h2>3. Participatory Requirements</h2>
    <p>
        In receiving this token allocation, you agree to engage in the following activities where you are able:
    </p>
    <ul>
        <li>Responding to community polls related to governance and project matters.</li>
        <li>Staking XIAN tokens to support network security and operations.</li>
        <li>Drafting, discussing, and submitting governance proposals.</li>
        <li>Utilizing voting rights to influence governance decisions.</li>
        <li>Participating in beta testing of new features or updates and providing constructive feedback.</li>
        <li>Volunteering to assist new and existing members and maintaining a positive community environment.</li>
        <li>Creating and sharing educational materials to promote blockchain understanding.</li>
        <li>Contributing to the project's development through feature proposals, bug fixes, or codebase improvements.</li>
        <li>Participating in hackathons as a participant, mentor, or judge.</li>
        <li>Enhancing network decentralization and security by running validators or other nodes.</li>
        <li>Organizing or participating in community events, meetups, and webinars.</li>
        <li>Supporting global accessibility by translating project materials into various languages.</li>
    </ul>

    <h2>4. Key Points Regarding the Airdrop</h2>

    <h3>4.1 No Expectation of Profit or Speculative Intent</h3>
    <p>
        Receiving XIAN tokens should not be construed as an investment. There is no guarantee that these tokens will hold any financial value. Participants should engage with the airdrop as an opportunity to contribute to the network's development rather than for potential financial gain.
    </p>

    <h3>4.2 No Guarantee of Continued Development</h3>
    <p>
        Project Xian does not obligate core contributors to continue development in any specific manner. The future growth and development of the Xian network depend entirely on the collective efforts of the community. Project Xian does not guarantee any particular outcomes or the sustained development of the network.
    </p>

    <h3>4.3 Pre-Existing Relationship with Xian</h3>
    <p>
        The airdrop is conducted exclusively through the Lamden & Xian forum and channels to ensure it reaches genuine contributors to the Lamden & Xian projects. This approach aims to recognize and reward members who have actively supported the Xian ecosystem and are committed to participating in Xian.
    </p>

    <h3>4.4 Compliance with Binance Terms of Service</h3>
    <p>
        Participation in the Xian token airdrop is restricted to individuals who are not residents or citizens of the following jurisdictions, as listed in Binance's Terms of Service (updated on 27 February 2024):
    </p>
    <ul>
        <li>Canada</li>
        <li>Netherlands</li>
        <li>United States</li>
        <li>Cuba</li>
        <li>DPRK (North Korea)</li>
        <li>Iran</li>
        <li>Syria</li>
        <li>Crimea region</li>
        <li>Certain non-government controlled areas of Ukraine</li>
    </ul>
    <p>
        Non-compliance with these restrictions may result in the ineligibility of your participatory stake.
    </p>

    <h2>5. Eligibility and Verification</h2>
    <p>
        To qualify for the airdrop, participants must:
    </p>
    <ul>
        <li>Be active members of the Xian community.</li>
        <li>Commit to the participatory activities outlined in Section 3.</li>
        <li>Not reside in or hold citizenship within the prohibited jurisdictions listed in Section 4.4.</li>
    </ul>

    <h2>6. Termination and Refunds</h2>
    <p>
        If you are unable to comply with the eligibility requirements or your participatory stake does not meet the necessary commitments, your stake may be deemed ineligible. In such cases:
    </p>
    <ul>
        <li>Your participatory stake may be adjusted, reduced, or returned to your wallet address.</li>
        <li>If notified of your inability to comply, any contributions related to the participatory stake will be returned to your wallet address.</li>
    </ul>
    <p>
        These measures are in place to maintain the integrity and compliance of Project Xian and to encourage meaningful participation that benefits the community.
    </p>

    <h2>7. Intellectual Property</h2>
    <p>
        All intellectual property rights related to Project Xian, including but not limited to trademarks, logos, and software, are the property of the Provider or its licensors. Participants agree not to use, modify, reproduce, or distribute any intellectual property without explicit consent from the Provider.
    </p>

    <h2>8. Limitation of Liability</h2>
    <p>
        The Provider shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from participation in the airdrop or use of the Xian network, including but not limited to financial losses, loss of data, or interruption of services.
    </p>

    <h2>9. Amendments</h2>
    <p>
        The Provider reserves the right to modify or update this Agreement at any time. Participants are responsible for regularly reviewing this Agreement to stay informed of any changes. Continued participation in the airdrop or the Xian network after modifications constitutes acceptance of the updated Agreement.
    </p>

    <p>
        As we continue the development of Project Xian, our commitment remains to create a secure, stable, and decentralized network. The active participation of our community is essential to achieving this vision.
    </p>

    <p>
        For any questions or further clarification, please reach out to us. Together, let's build an active, vibrant, and collaborative Xian ecosystem.
    </p>

    <p>Last updated: 27 September 2024</p>
    <p>Xian Network</p>
</div>
{#if $storeTermsAgreement === "disagree"}
    <div class="agree-button">
        <button on:click={()=>{storeTermsAgreement.set("agree")}}>Agree to Terms</button>
    </div>
{:else}
    <div style="height: 20.86px;"></div>
{/if}

<div class="nav-button-container">
    {#if $storeTermsAgreement === "agree"}
        <div>
            <button on:click={()=>{storeCurrentPageIndex.set(0)}}>Back</button>
        </div>
            <div>
                <button on:click={()=>{storeCurrentPageIndex.set(2)}}>Next</button>
            </div>
    {:else}
        <div class="back-button">
            <div>
                <button on:click={()=>{storeCurrentPageIndex.set(0)}}>Back</button>
            </div>
        </div>
    {/if}
</div>
<style>
    .heading {
        width: 100%;
        max-width: 450px;
        padding-top: 3rem;
        padding-bottom: 1rem;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 800;
        /* text-decoration: underline; */
    }
    .agree-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 3rem;
    }
    .scrollable-container {
        height: 400px; /* Increased height for comprehensive terms */
        width: 100%; /* Adjusted width as needed */
        max-width: 450px;
        overflow-y: auto; /* Enable vertical scrolling */
        border: 1px solid #ccc; /* Adds a border for visibility */
        padding: 20px; /* Adds inner spacing */
        background-color: #f9f9f9; /* Optional: background color for readability */
        font-family: Arial, sans-serif; /* Optional: improved font */
        font-size: 14px; /* Optional: adjusted font size */
        line-height: 1.6; /* Optional: improved line spacing */
        color: #000;
        text-align: left;
    }
    .scrollable-container h1 {
        text-align: left;
        margin-bottom: 20px;
        color: #000;

    }
    .scrollable-container h2 {
        margin-top: 20px;
        color: #000;
    }
    .scrollable-container h3 {
        margin-top: 15px;
        color: #000;
    }
    .scrollable-container ul {
        margin-left: 20px;
    }
    .nav-button-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        min-width: 450px;
        max-width: 450px;
        margin-top: 20px;
        padding-bottom: 10rem;
    }
    .next-button, .back-button {
        max-width: 100px;
        margin-top: 20px;
    }
    /* .back-button {
        justify-content: flex-start;
    }
    /* button {
        padding: 10px 20px;
        background-color: #007BFF;
        border: none;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
    } */
    button:hover {
        background-color: #0056b3;
    }

    p {
        color: #000;
    }
</style>