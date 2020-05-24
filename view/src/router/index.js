import Vue from 'vue'
import VueRouter from 'vue-router'
const register=()=>import('../views/register');
const login=()=>import('../views/login');
const Resetaccount=()=>import('../views/Resetaccount');
const Home=()=>import('../views/Home')
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
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
