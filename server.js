const express = require('express');
const path = require('path');
const fs = require('fs');

const apiRoutes = require('./server/routes/api');

const PORT = process.env.PORT || 3006;
const HOST = process.env.HOST || '127.0.0.1';
const isProd = process.env.NODE_ENV === 'production';

async function start() {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api', apiRoutes);

  if (isProd) {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      configFile: path.join(__dirname, 'vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.join(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`X11 rodando em http://${HOST}:${PORT} (${isProd ? 'produção' : 'desenvolvimento'})`);
  });
}

start();
