const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyConfig = {
  "changeOrigin": true,
  "secure": false,
  "target": `${process.env.REACT_APP_DIRECTUS_URL}`,
  "headers": {
      "host": "*",
      "origin": "*",
      "method": "*"
  },
  "onProxyReq": function(proxyReq, req, res) {
      proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_DIRECTUS_TOKEN}`)
  },
  "ws": false, // enable websocket proxy
  "logger": console,
}

module.exports = function(app) {
  app.use("/users", createProxyMiddleware(proxyConfig));
  app.use("/auth/login", createProxyMiddleware(proxyConfig));
  app.use("/items/user_profile/", createProxyMiddleware(proxyConfig));
  app.use("/items/*", createProxyMiddleware(proxyConfig));
}