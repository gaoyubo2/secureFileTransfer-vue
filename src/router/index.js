import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TestFileTransfer from "../components/TestFileTransfer.vue";
import TestFileTransfer2 from "../components/TestFileTransfer2.vue";
import FileDataTable from "../components/FileDataTable.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'TestFileTransfer',
      component: TestFileTransfer
    },
    {
      path: '/test2',
      name: 'TestFileTransfer2',
      component: TestFileTransfer2
    },
    {
      path: '/fileTable',
      name: 'FileDataTable',
      component: FileDataTable
    }
  ]
})
