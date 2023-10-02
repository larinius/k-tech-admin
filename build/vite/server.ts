import type { ServerOptions } from 'vite';

export function createViteServer(): ServerOptions {
  const viteServer: ServerOptions = {
    // Server host name，If external access is allowed，Can be set to"0.0.0.0"
    host: true,
    // Server port number
    port: 5173,
    // Whether the port has been occupied when it is occupied, try to use the next available port true：Exit directly，Instead of trying the next available port false：Try the next available port
    strictPort: false,
    // boolean | string When starting the project, automatically open the application in the browser；If you are string, for example "/index.html"，Will open http://localhost:5173/index.html
    // open: true,
    // boolean | CorsOptions  Configure the server CORS. By default and allow any source，Transfer an option object to adjust the behavior or set to FALSE for disable.
    // cors: true,
    // Set as true Force dependence on preparatory construction.
    // force: false,
    // Customized proxy rules
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
  return viteServer;
}
