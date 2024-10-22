import Onboard from "@web3-onboard/core";
import type { OnboardAPI } from "@web3-onboard/core";
import injectedWalletsModule from "@web3-onboard/injected-wallets";
// import walletConnectModule from '@web3-onboard/walletconnect'

const injected = injectedWalletsModule();
/* const walletConnect = walletConnectModule({
  connectFirstChainId: true,
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  }
}) */

// const wallets = [injected, walletConnect]
const wallets = [injected];

const INFURA_ID = "";

const chains = [
    {
        id: 1,
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: "https://1rpc.io/eth",
        // rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
    },
];

const appMetadata = {
    name: "XIAN Seed Token Claim",
    icon: "<svg />",
    logo: "<svg />",
    description: "Claim your XIAN Seed Token",
    recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" },
    ],
};

const connect = {
    autoConnectLastWallet: true,
};

let onboard;

if (!onboard) {
    onboard = Onboard({
        wallets,
        chains,
        appMetadata,
        connect,
    });
}

export default onboard as OnboardAPI;
