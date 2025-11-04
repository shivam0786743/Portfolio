import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/', // 👈 ye line add karni hai
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
