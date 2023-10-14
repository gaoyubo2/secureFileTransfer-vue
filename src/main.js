// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins/element.js'
import request from "./utils/request";
import uploader from 'vue-simple-uploader'
Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = '/api'; //调用axios时前端加上默认路由/api
Vue.prototype.$axios = axios

Vue.use(uploader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  request,
  components: { App },
  template: '<App/>'
})
