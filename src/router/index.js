import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '@/stores/counter';
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"Login",
      component:()=>import('@/views/LoginPage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,

      beforeEnter:(to,from,next) =>{
        const authstore=useCounterStore()
        if(from.name=='Login'){
         next();
        }
        else{
          if(!authstore.loginstatus==true){
            next({name:'Login'})
          }
          next()
           
        }
     }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      beforeEnter:(to,from,next) =>{
        const authstore=useCounterStore()
        if(from.name=='Login'){
         next();
        }
        else{
          if(!authstore.loginstatus==true){
            next({name:'Login'})
          }
          next()
           
        }
     }

    }
  ]
})

export default router