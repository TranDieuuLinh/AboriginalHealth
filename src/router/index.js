import { createRouter, createWebHistory } from 'vue-router'
import SignUpView from '../views/SignUpView.vue'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue'
import AdminHomeView from '../views/AdminHomeView.vue'
import NewsEventsView from '../views/NewsEventsView.vue'
import FundraisingView from '../views/FundraisingView.vue'
import AddNewsView from '../views/AddNewsView.vue'
import AddEventsView from '../views/AddEventsView.vue'
import AddFundStoryView from '../views/AddFundStoryView.vue'
import FundDetail from '../components/FundDetail.vue'
import DonateForm from '../components/DonateForm.vue'

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
    {
      path:'/newsEvents',
      name:'newsEvents',
      component:NewsEventsView
    },
    {
      path:'/fundraising',
      name:'fundraising',
      component:FundraisingView
    },
    {
      path:'/addNews',
      name:'addNews',
      component:AddNewsView
    },
    {
      path:'/addEvents',
      name:'addEvents',
      component:AddEventsView
    },
    {
      path:'/addFundStory',
      name:'addFundStory',
      component:AddFundStoryView
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:FundDetail,
      props:true
    },
    {
      path:'/DonateForm',
      name:'DonateForm',
      component:DonateForm,
      props: (route) => ({ title: route.query.title })
    },
  ]
})

export default router
