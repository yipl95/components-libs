module.exports = {
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://csc-dev.boundless-tech.com.cn/backend',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
};
