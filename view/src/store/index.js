import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      Authority:-1 //权限信息
  },
  mutations: {
    setAuthority(state,n){
      state.Authority=n;
    }
  },
  actions: {
     SETAUTHORITY({commit},n){
       commit('setAuthority',n)
     }
  },
  modules: {
  }
})
