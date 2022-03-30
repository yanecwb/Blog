const userInfo ={
  namespaced: true,
  state:{
    userInfo:JSON.parse( localStorage.getItem('userInfo')) || {accountInfo:{}}
  },
  actions:{},
  mutations:{
    SAVE_USERINFO(state,val){
      state.userInfo = val
      localStorage.setItem('userInfo',JSON.stringify(val))
    }
  },
  getters:{},
}

export default userInfo