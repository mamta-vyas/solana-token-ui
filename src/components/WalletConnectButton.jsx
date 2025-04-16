import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


const WalletConnectButton = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    const { solana } = window;
    if (solana && solana.isPhantom) {
      try {
        const response = await solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (err) {
        console.error('Connection failed!', err);
      }
    } else {
      alert('Phantom Wallet not found. Please install it.');
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana?.isPhantom) {
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
      }
    } catch (error) {
      console.log('Wallet not connected' , error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="text-center my-4">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md"
        >
          Connect to Phantom Wallet
        </button>
      ) : (
        <p className="text-green-400 font-mono">✅ Connected: {walletAddress}</p>
      )}
    </div>
  );
};

export default WalletConnectButton;
