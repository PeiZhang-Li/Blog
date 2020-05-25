import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '../api/api';
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http=http;
import ups from "../filter/filterpath";
import { Message } from 'element-ui';
let loginroute=['/Personalcenter']
router.beforeEach((to,form,next)=>{
   if(loginroute.includes(to.path)){
     if(localStorage.getItem('userinfo')){
         next();
     }else{
         Message.error('您还没有登录')
         next('/login')
     }
   }else{
        next();
   }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
