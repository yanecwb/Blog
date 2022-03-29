import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './assets/fonticon/iconfont.css'
import 'nprogress/nprogress.css'
import router from './route';
import less from 'less'

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
