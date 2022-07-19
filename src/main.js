import Vue from "vue";
import App from "./App.vue";
import "ant-design-vue/dist/antd.css";
import "./assets/fonticon/iconfont.css";
import router from "./route";
import "animate.css";
import "hover.css";
import "./assets/tailwindcss.css"
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入进度条样式
import './main.css'

import lottie from 'vue-lottie'; //lottie动画
Vue.component('lottie', lottie) //注册lottie动画

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 进度条开始
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

// 进度条结束
router.afterEach(() => {
  NProgress.done()
})
import './utils/public.less'// 公共css
import Swal from "sweetalert2"; //提示组件
import { message } from "ant-design-vue"; //ant-message组件
Vue.prototype.$message = message;
Vue.prototype.$Swal = Swal;

// 解决路由冗余报错问题vue-router3.0+
import Router from "vue-router";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
import store from "./store";
Vue.config.productionTip = false;

import mixin from "./mixins/public";
Vue.mixin(mixin);

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount("#app");
