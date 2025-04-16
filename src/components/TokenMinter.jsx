import React, { useState } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { mintTo, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';

const TokenMinter = () => {
  const [mintAddress, setMintAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();

  const handleMint = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert('Connect your wallet first!');
      return;
    }
  
    if (!mintAddress || !amount) {
      alert('Please fill in both the fields.');
      return;
    }
  
    setLoading(true);
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
      const mint = new PublicKey(mintAddress);
      console.log('Mint Address:', mint.toBase58());
  
      // Fix: Use `wallet.adapter` instead of `wallet` (important!)
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet.adapter,           // ✅ FIXED
        mint,
        wallet.publicKey
      );
  
      console.log('Token Account:', tokenAccount.address.toBase58());
  
      const signature = await mintTo(
        connection,
        wallet.adapter,           // ✅ FIXED
        mint,
        tokenAccount.address,
        wallet.publicKey,
        Number(amount)
      );
  
      console.log('Minting successful with signature:', signature);
      alert(`Successfully minted ${amount} tokens.`);
    } catch (error) {
      console.error('Error minting token:', error);
      alert('Minting failed! Check the console for details.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-8">
      <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Token Minter</h1>
        <input
          type="text"
          placeholder="Token Mint Address"
          value={mintAddress}
          onChange={(e) => setMintAddress(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 text-xl text-neutral-700 placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Amount to Mint"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4 text-xl text-neutral-700 placeholder-gray-400"
        />
        <button
          onClick={handleMint}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ease-in-out disabled:opacity-50"
        >
          {loading ? 'Minting...' : 'Mint Tokens'}
        </button>
      </div>
    </div>
  );
};

export default TokenMinter;
