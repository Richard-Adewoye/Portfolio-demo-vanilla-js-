import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { GoogleGenAI } from '@google/genai';

function chatApiPlugin(): Plugin {
  return {
    name: 'chat-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', async () => {
            try {
              const { message, profile } = JSON.parse(body || '{}');
              const apiKey = process.env.GEMINI_API_KEY;
              if (apiKey) {
                const ai = new GoogleGenAI({ apiKey });
                const response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: [
                    {
                      role: 'user',
                      parts: [
                        {
                          text: `You are Alex's AI Portfolio Assistant for Alex Rivera (${profile?.title || 'Senior Full Stack & UI Systems Engineer'}). Location: ${profile?.location || 'San Francisco, CA'}. Email: ${profile?.email || 'alex.rivera@example.com'}. Answer questions helpfully, concisely (2-3 sentences), and professionally based on Alex's portfolio.\nUser message: ${message}`
                        }
                      ]
                    }
                  ]
                });
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ text: response.text }));
                return;
              }
            } catch (e) {
              console.error('Chat API Error:', e);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ text: null }));
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), chatApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
