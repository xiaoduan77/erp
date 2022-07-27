import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    redirect: '/home/welcome',
    children: [{ path: 'welcome', component: () => import('@/views/Welcome') },
      { path: 'users', component: () => import('@/views/Users') },
      { path: 'permissionmanager', component: () => import('@/views/PermissionManager') },
      {
        path: 'goodslist',
        component: () => import('@/views/GoodsList'),
        meta: { showTag: true },
        children: [
          { path: 'add', name: 'add', component: () => import('@/views/addGoods'), meta: { showTag: false } }

        ]
      },
      { path: 'orders', component: () => import('@/views/orderManager') },
      { path: 'userlist', component: () => import('@/views/userlist') },
      { path: 'categoriesparams', component: () => import('@/views/categoriesParams') },
      { path: 'categoriesgoods', component: () => import('@/views/categoriesGoods') }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
