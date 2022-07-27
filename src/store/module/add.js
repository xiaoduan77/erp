import { addGoods } from '@/views/addGoods'
const state = {
  addGoodsParams: ''
}
const mutations = {
  setGoodsParams(state, payload) {
    state.addGoodsParams = payload
  }
}
const actions = {

}
const modules = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
