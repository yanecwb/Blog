import Vuex from 'vuex'
import Vue from 'vue'
import scroll from './modules/scroll'
import userInfo from './modules/userInfo'
Vue.use(Vuex)
const store =  new Vuex.Store({
  state:{
    show_footer:false
  },
  mutations:{
    change_show_footer(state,val){
      state.show_footer = val
    }
  },
  modules:{
    scroll,
    userInfo
  }
})
export default store
