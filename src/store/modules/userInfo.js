// let Info = JSON.parse( localStorage.getItem('userInfo')) || {accountInfo:{}}
// const loginTime = localStorage.getItem('loginTime')
// if(!(new Date().getTime() - loginTime > 259200000) ){
//   Info = {accountInfo:{}}
//   if(location.pathname !== '/login'){
//     location.href = location.origin + '/login'
//   }
// }
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