import Vuex from 'vuex'
import Vue from 'vue'
import scroll from './modules/scroll'
import userInfo from './modules/userInfo'
Vue.use(Vuex)
const store =  new Vuex.Store({
  modules:{
    scroll,
    userInfo
  }
})
export default store