import React, { useEffect, useState } from 'react';

const WalletInfo = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const { solana } = window;
    if (solana?.isPhantom) {
      solana.connect({ onlyIfTrusted: true }).then((response) => {
        setWalletAddress(response.publicKey.toString());
      });
    }
  }, []);

  if (!walletAddress) return null;

  return (
    <div className="text-center text-sm text-gray-400 mt-2">
      <p>💼 Wallet Address: {walletAddress}</p>
    </div>
  );
};

export default WalletInfo;
