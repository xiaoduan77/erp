import axios from 'axios'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  const token = store.state.user.token
  console.log(token)
  if (token) {
    config.headers.Authorization = token
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default instance
