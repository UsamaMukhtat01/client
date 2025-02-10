import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy: {
  //   '/api': {
  //     target: 'http://localhost:3000',
  //     // target: 'https://mern-estate.azurewebsites.net',
  //     secure: false
  //   },
    
  // },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Correct placement of alias
    },
  },
})
