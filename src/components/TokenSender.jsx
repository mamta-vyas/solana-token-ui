import { useState } from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';

const TokenSender = () => {
  const [mintAddress, setMintAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const wallet = useWallet();

  const handleSend = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert('Connect your wallet first!');
      return;
    }

    if (!mintAddress || !recipient || !amount) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    try {
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const mint = new PublicKey(mintAddress);
      const recipientPubKey = new PublicKey(recipient);

      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mint,
        wallet.publicKey
      );

      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        wallet,
        mint,
        recipientPubKey
      );

      const sig = await transfer(
        connection,
        wallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        wallet.publicKey,
        Number(amount)
      );

      console.log('Transfer success:', sig);
      alert(`Sent ${amount} tokens to ${recipient}`);
    } catch (error) {
      console.error('Error sending token:', error);
      alert('Sending failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Token Mint Address"
        value={mintAddress}
        onChange={(e) => setMintAddress(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 text-xl text-neutral-700 placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Recipient Wallet Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 text-xl text-neutral-700 placeholder-gray-400"
      />
      <input
        type="number"
        placeholder="Amount to Send"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4 text-xl text-neutral-700 placeholder-gray-400"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send Tokens'}
      </button>
    </div>
  );
};

export default TokenSender;
