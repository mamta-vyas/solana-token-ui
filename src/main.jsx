import React from 'react'
import { createRoot } from 'react-dom/client'  // ✅ Add this line
import App from './App.jsx'
import WalletContextProvider from './WalletContextProvider'
import './index.css'

window.Buffer = Buffer

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </React.StrictMode>
)
