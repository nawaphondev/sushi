import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build: {
  //   manifest: true,
  //   rollupOptions: {
  //     input: "/src/main.jsx",
  //     output: {
  //       manualChunks: {
  //         react: ["react"],
  //         "react-dom": ["react-dom"],
  //         "react-dom/server": ["react-dom/server"],
  //         "react-router-dom": ["react-router-dom"],
  //         "react-query": ["@tanstack/react-query"],
  //       },
  //     },
  //   },
  // }
})