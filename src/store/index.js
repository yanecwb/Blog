import Vuex from 'vuex'
import Vue from 'vue'
import scroll from './modules/scroll'
Vue.use(Vuex)
const store =  new Vuex.Store({
  modules:{
    scroll
  }
})
export default store