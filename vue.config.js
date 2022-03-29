module.exports = {
  lintOnSave: false,

  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      '/node_api': {
        target: 'http://localhost:5003', 
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/node_api': ''
        }
      },
      '/api': {
        target: 'http://www.codeman.ink:3000', // http://192.168.1.225:8081/admin_api/
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
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

