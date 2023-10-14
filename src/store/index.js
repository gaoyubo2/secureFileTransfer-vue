import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入小仓库
import user from './user'
export default new Vuex.Store({
  modules: {
    user
  },
})
