import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './assets/fonticon/iconfont.css'
import 'nprogress/nprogress.css'

import store from './store'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
