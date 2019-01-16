import Vue from 'vue'
import Router from 'vue-router'
import About from '@/components/About'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/open-chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
