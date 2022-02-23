module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/weather_api': {
        target: 'https://www.tianqiapi.com/api', // http://192.168.1.225:8081/admin_api/
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/weather_api': ''
        }
      },
    }
  },
}
