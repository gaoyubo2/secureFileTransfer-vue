import Vue from 'vue'
import Router from 'vue-router'

import FileDataTable from "../components/FileDataTable.vue";
import Login from "../components/Login.vue";
import Test1 from "../components/Test1.vue";

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'FileDataTable',
      component: FileDataTable
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test1',
      name : 'test1',
      component: Test1
    }
  ]
})
