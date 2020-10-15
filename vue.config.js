module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  css: {
    sourceMap: true,
  },
  devServer: {
    port: process.env.DEV_SERVER_PORT || 80,
  },
};
