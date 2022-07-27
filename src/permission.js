// 路由守卫
import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/home')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
