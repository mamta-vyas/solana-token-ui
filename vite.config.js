import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'; // ✅ named import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      protocolImports: true,  // Ensure that node protocols are available
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer', // Ensure that 'buffer' is aliased for the browser
      process: 'process/browser', // Ensure 'process' is polyfilled for browser
    },
  },
  define: {
    global: 'globalThis', // Ensure `globalThis` is used in place of `global` in the browser
  },
  optimizeDeps: {
    include: ['buffer', 'process'], // Ensure dependencies are pre-bundled
  },
  build: {
    rollupOptions: {
      external: ['@solana/web3.js', '@solana/spl-token'], // Exclude Solana packages from bundling
    },
  },
});
