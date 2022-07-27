// 登录界面的vuex
import { login } from '@/api/user'
import { Message } from 'element-ui'

const state = {
  token: ''
}
const mutations = {
  setToken(state, payload) {
    state.token = payload
  },
  removeToken(state) {
    state.token = null
  }
}
const actions = {
  async login(context, data) {
    try {
      const res = await login(data)
      console.log(res)
      if (res.data.meta.status === 200) {
        Message.success('登录成功')
        context.commit('setToken', res.data.data.token)
      } else {
        // throw new Error(res.data.meta.msg)
        // Promise.reject会跑到login index.vue的catch里面，从而阻止跳转
        return Promise.reject(new Error(res.data.meta.msg))
      }
    } catch (error) {
      return Promise.reject(new Error('登录失败，请重试'))
    }
  },
  logout(context) {
    context.commit('removeToken')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
