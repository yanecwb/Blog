const scroll ={
  namespaced: true,
  state:{
    scrollTop:0,
  },
  actions:{},
  mutations:{
    change_scrollTop(state,val){
      state.scrollTop = val
    }
  },
  getters:{},
}

export default scroll