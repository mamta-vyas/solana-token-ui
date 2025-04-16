import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import TokenCreator from '../components/TokenCreator';
import TokenMinter from '../components/TokenMinter';
import TokenSender from '../components/TokenSender';

const Home = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Solana Token DApp</h1>

      {/* Wallet Connect Button */}
      <div className="text-center mb-6">
        <WalletMultiButton />
      </div>

      {/* Token Operations */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Token Operations</h2>

        <div className="p-4 bg-white rounded shadow text-black">
          <h3 className="text-xl font-bold mb-2">Create Token</h3>
          <TokenCreator />
        </div>

        <div className="p-4 bg-white rounded shadow text-black">
          <h3 className="text-xl font-bold mb-2">Mint Tokens</h3>
          <TokenMinter />
        </div>

        <div className="p-4 bg-white rounded shadow text-black">
          <h3 className="text-xl font-bold mb-2">Send Tokens</h3>
          <TokenSender />
        </div>
      </section>
    </div>
  );
};

export default Home;
