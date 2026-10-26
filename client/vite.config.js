import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function generateSpaFallbackPlugin() {
  return {
    name: 'generate-spa-fallbacks',
    closeBundle() {
      const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');
      const srcIndex = path.join(distDir, 'index.html');
      if (!fs.existsSync(srcIndex)) return;

      const fallbackPages = ['visitor-question', 'visitor-questions', 'visitor-qustion'];
      for (const page of fallbackPages) {
        const pageDir = path.join(distDir, page);
        fs.mkdirSync(pageDir, { recursive: true });
        fs.copyFileSync(srcIndex, path.join(pageDir, 'index.html'));
        fs.copyFileSync(srcIndex, path.join(distDir, `${page}.html`));
      }

      // 404.html fallback for static hosts
      fs.copyFileSync(srcIndex, path.join(distDir, '404.html'));
    },
  };
}

export default defineConfig({
  plugins: [react(), generateSpaFallbackPlugin()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});

