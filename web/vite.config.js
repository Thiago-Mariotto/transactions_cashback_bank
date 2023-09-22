import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": env
    },
    server: {
      host: true,
      port: 3000,
    },
  })
}