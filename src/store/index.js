import Vuex from 'vuex'
import Vue from 'vue'
import scroll from './modules/scroll'
import userInfo from './modules/userInfo'
Vue.use(Vuex)
const store =  new Vuex.Store({
  state:{
    show_footer:false,
    show_header:true
  },
  mutations:{
    change_show_footer(state,val){
      state.show_footer = val
    },
    change_show_header(state,val){
      state.show_header = val
    }
  },
  modules:{
    scroll,
    userInfo
  }
})
export default store
