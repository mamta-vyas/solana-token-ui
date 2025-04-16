# 🪙 Solana Token Creator

A simple React + Solana Web3 app that allows users to connect their wallet and create a custom token (mint) on the **Solana Devnet**.

## 🚀 Features Implemented

✅ Connect to Solana Wallet using `@solana/wallet-adapter-react`  
✅ Create a new Token Mint using `@solana/web3.js` and `@solana/spl-token`  
✅ Display the Mint Address once created  
✅ Responsive and minimal UI using TailwindCSS

## ⚠️ Current Limitations

> We're able to generate the mint address successfully, but further token minting and transfer actions are blocked due to wallet adapter limitations.

### ❌ Issues Not Yet Resolved

- ❌ Encountered error: `TypeError: Cannot read properties of null (reading 'publicKey')` when trying to create associated token accounts or mint tokens.
- ❌ Unable to proceed with `mintTo` and token transfers due to missing `publicKey` in transaction context.
- ❌ Project is currently tested only on **Devnet** – not deployed/tested on Mainnet.


## 🛠️ Tech Stack

- React.js
- Tailwind CSS
- Solana Web3 (`@solana/web3.js`)
- SPL Token Library (`@solana/spl-token`)
- Wallet Adapter (`@solana/wallet-adapter-react`)

## 🧪 How to Run Locally

1. Clone the repo:

   git clone https://github.com/your-username/solana-token-creator.git
   cd solana-token-creator


Install dependencies:
npm install

Start the development server:
npm run dev

Open the app in your browser and connect a Phantom wallet (or any supported Solana wallet) on Devnet.

📚 Future Work
 Fix wallet transaction signing issue (likely due to missing keypair signing or adapter limitations)

 Add mintTo functionality to issue tokens to associated token accounts

 Add UI to send tokens to other users

 Add better error handling and loading states

 Test across different wallets (Sollet, Solflare)

🙋‍♂️ Author
Mamta Vyas
