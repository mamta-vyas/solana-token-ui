// src/components/TokenCreator.jsx
import React, { useState } from 'react'
import {
  Connection,
  clusterApiUrl,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
} from '@solana/web3.js'
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from '@solana/spl-token'

const TokenCreator = () => {
  const [status, setStatus] = useState('')
  const [tokenAddress, setTokenAddress] = useState(null)

  const handleCreateToken = async () => {
    try {
      setStatus('Creating token...')

      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

      // Generate a new wallet (keypair)
      const fromWallet = Keypair.generate()

      // Airdrop some SOL to pay for transactions
      const airdropSignature = await connection.requestAirdrop(
        fromWallet.publicKey,
        2e9 // 2 SOL
      )
      await connection.confirmTransaction(airdropSignature, 'confirmed')

      // Create new token mint
      const mint = await createMint(
        connection,
        fromWallet,
        fromWallet.publicKey, // Mint authority
        null, // Freeze authority (optional)
        9 // Decimals
      )

      setTokenAddress(mint.toBase58())
      setStatus('Token mint created! Creating token account...')

      // Create token account (associated with user's wallet)
      const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey // Owner of the account
      )

      setStatus('Minting tokens...')

      // Mint 1000 tokens to token account
      await mintTo(
        connection,
        fromWallet,
        mint,
        tokenAccount.address,
        fromWallet.publicKey,
        1000 * 10 ** 9 // amount * 10^decimals
      )

      setStatus(`✅ Token Created: ${mint.toBase58()}`)

    } catch (error) {
      console.error(error)
      setStatus(`❌ Error: ${error.message}`)
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
      <h2 className="text-xl font-semibold">Create a New SPL Token</h2>
      <button
        onClick={handleCreateToken}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Create Token
      </button>
      <p className="text-gray-700 break-words">{status}</p>
      {tokenAddress && (
        <p className="text-green-600 font-mono">
          Mint Address: {tokenAddress}
        </p>
      )}
    </div>
  )
}

export default TokenCreator
