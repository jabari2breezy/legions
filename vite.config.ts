import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ['**/*.mp4'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
