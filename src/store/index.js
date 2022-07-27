import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import add from './module/add'
import getters from './getters'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    add
  },
  plugins: [vuexLocal.plugin]
})
