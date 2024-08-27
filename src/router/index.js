import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../views/SignUpView.vue'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import AdminHomeView from '../views/AdminHomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/signup',
      name:'signup',
      component:SignUpView
    },
    {
      path:'/login',
      name:'login',
      component:LogInView
    },
    {
      path:'/adminHome',
      name:'adminHome',
      component:AdminHomeView
    },
  ]
})

export default router
