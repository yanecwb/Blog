import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './assets/fonticon/iconfont.css'
import 'nprogress/nprogress.css'
import router from './route';
import less from 'less'


// 解决路由冗余报错问题vue-router3.0+
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import store from './store'
Vue.config.productionTip = false
import "animate.css";


import mixin from './mixins/public';
Vue.mixin(mixin)
Vue.use(less)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
