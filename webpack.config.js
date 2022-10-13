var webpack = require('webpack');
//const { createProxyMiddleware } = require('http-proxy-middleware');

const PROXY_HEADERS = {
  'host': 'moandbear-cms-dev.5i9kftpno7oc0.ap-southeast-1.cs.amazonlightsail.com',
  'origin' : '*',
  'method' : '*',
};

const config = {
    entry: './src/index.js',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      crossOriginLoading: true,
    },
    mode: 'production',
    /*
    proxy: [
      {
        target: 'https://moandbear-cms-dev.5i9kftpno7oc0.ap-southeast-1.cs.amazonlightsail.com',
        headers: PROXY_HEADERS,
        secure: false,
        ws: true,
      },
    ],
    port: 8572,
    */
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      allowedHosts: ['localhost',
                      'moandbear-cms-dev.5i9kftpno7oc0.ap-southeast-1.cs.amazonlightsail.com',
                      'main.d3hl703kokgfwt.amplifyapp.com',
                    ],
      hot: true,
      /*
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        
        devServer.app.use("/users/*", createProxyMiddleware(proxyConfig));
        devServer.app.use("/roles/*", createProxyMiddleware(proxyConfig));
        devServer.app.use("/auth/*", createProxyMiddleware(proxyConfig));
        devServer.app.use("/items/*", createProxyMiddleware(proxyConfig));
        
        
        devServer.app.get('/', (_, response) => {
          response.send('setup-middlewares option GET');
        });
        
        
        // Use the `unshift` method if you want to run a middleware before all other middlewares
        // or when you are migrating from the `onBeforeSetupMiddleware` option
        middlewares.unshift({
          name: 'first-in-array',
          // `path` is optional
          path: '/',
          middleware: (req, res) => {
             res.send('Foo!');
           },
         });
       
        return middlewares;
      },
      */
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement',
      }),
      // Plugin for hot module replacement
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer']
      }),
    ],
};

module.exports = config;