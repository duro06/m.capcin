// Add this line:
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  // devServer: {
  //   proxy: "http://localhost:8000/"
  // },
  chainWebpack(config) {
    config.plugins.delete("prefetch");
    // and this line
    config.plugin("CompressionPlugin").use(CompressionPlugin);
  },
  // pwa config for production => ga usah coba-coba
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          // urlPattern: new RegExp("^https://api.zippopotam.us/us/"),
          urlPattern: new RegExp("^http://localhost:8000"),
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
};
