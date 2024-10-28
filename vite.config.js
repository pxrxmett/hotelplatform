import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import qrcode from 'qrcode-terminal'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
    /**
     * Show QR code in terminal
     */
    onListening: (server) => {
      const { address, port } = server.httpServer.address()
      const localIp = Object.values(require('os').networkInterfaces())
        .flat()
        .find(({ family, internal }) => family === 'IPv4' && !internal)?.address
      
      if (localIp) {
        const url = `http://${localIp}:${port}`
        console.log('\nScan QR code to open in mobile:')
        qrcode.generate(url, { small: true })
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})