import React from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const BTTChain = {
  id: 1029,
  name: "BTTC",
  network: "BitTorrent Chain Donau",
  iconUrl: "https://testscan.bt.io/static/media/BTT.e13a6c4e.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "BitTorrent Chain Donau",
    symbol: "BTT",
  },
  rpcUrls: {
    default: "https://pre-rpc.bittorrentchain.io/",
  },
  blockExplorers: {
    default: {
      name: "BitTorrent Chain Donau",
      url: "https://testscan.bt.io",
    },
  },
  testnet: true,
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const { chains, provider } = configureChains(
  // [BTTChain],
  [BTTChain, mainnet, polygon, optimism, arbitrum],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: "https://pre-rpc.bittorrentchain.io/" }),
    }),
    alchemyProvider({ apiKey: "sBJaf_DeCXnYD5KRiK36IeGjdc0hQCEs" }),
    // publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
