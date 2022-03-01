import Vue from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './assets/fonticon/iconfont.css'
import 'nprogress/nprogress.css'
import 'element-plus/dist/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
