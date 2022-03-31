import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './assets/fonticon/iconfont.css'
import router from './route';
import "animate.css";
import 'hover.css'

import {message} from 'ant-design-vue'
Vue.prototype.$message = message;


// 解决路由冗余报错问题vue-router3.0+
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import store from './store'
Vue.config.productionTip = false


import mixin from './mixins/public';
Vue.mixin(mixin)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
