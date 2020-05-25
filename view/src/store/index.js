import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      Authorityarr:[] //权限子路由个人中心那块的
  },
  mutations: {
    setAuthority(state,n){
      state.Authorityarr=n;
    }
  }
})
