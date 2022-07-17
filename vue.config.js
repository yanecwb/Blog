const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //引入插件
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
  },
  // pwa: {
  //   iconPaths: {
  //     favicon32: "favicon.ico",
  //     favicon16: "favicon.ico",
  //     appleTouchIcon: "favicon.ico",
  //     maskIcon: "favicon.ico",
  //     msTileImage: "favicon.ico",
  //   },
  // },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: true,
            },
            // 删除console debugger 删除警告
            compress: {
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ["console.log"], //移除console
            },
          },
        }),
      ],
    },
  },

  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    proxy: {
      "/node_api": {
        target: "http://localhost:5006/",
        // target: "http://www.flechazoblog.site:5006/",
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/node_api": "",
        },
      },
      "/api": {
        target: "http://www.codeman.ink:3000", // http://192.168.1.225:8081/admin_api/
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/weather_api": {
        target: "https://www.tianqiapi.com/api", // http://192.168.1.225:8081/admin_api/
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/weather_api": "",
        },
      },
    },
  },
};
