import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import filterrouter from './filterrouter/filterrouter'
const register=()=>import('../views/register');
const login=()=>import('../views/login');
const Resetaccount=()=>import('../views/Resetaccount');
const Home=()=>import('../views/Home');
const Personalcenter=()=>import('../views/Personalcenter')
const Error =()=>import('../views/Error')
const PersonalInformation =()=>import('../views/Personalcenter-child/Personal-information')
const classification=()=>import('../views/Personalcenter-child/classification')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/register',
    name: 'register',
    component: register
  },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/Resetaccount',
      name:'Resetaccount',
      component:Resetaccount
    },
    {
      path:'/',
      name:'home',
      component:Home
    },
    {
      path:'/Personalcenter',
      name:'Personalcenter',
      component:Personalcenter,
      children:[
        {
          path:'/Personalcenter',
          name:'Personalcenter',
          component:PersonalInformation,
          meta:{
            name:'个人设置'
          }
        }
      ]
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
]
const asyncroutes=[
  {
    path:'/Personalcenter/classification',
    name:'classification',
    component:classification,
    meta:{
        Authority:['0'],
        name:'分类管理'
    }
  }

]
if(localStorage.getItem('userinfo')){
  let PersonalcenterChild=filterrouter(asyncroutes);
  routes.forEach(item=>{
    if(item.path=='/Personalcenter'){

      item.children=item.children.concat(PersonalcenterChild)
      store.commit('setAuthority',item.children)
    }
  })
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
