<template>
  <div>
    <el-button class="welcome">欢迎您：{{userInfo.username}}， VIP等级：{{userInfo.vip}}<i class="el-icon-view el-icon--right"></i> </el-button>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        <el-link v-on:click="navigate('/')" :underline="false" >根目录</el-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbItems"
        :key="index"
      >
        <el-link v-if="currentPath === item.directoryPath" disabled v-on:click="navigate(item.directoryPath)" :underline="false">{{ item.directoryName }}</el-link>
        <el-link v-else v-on:click="navigate(item.directoryPath)" :underline="false">{{ item.directoryName }}</el-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <FileUpload v-if="currentPath !== '/' " :currentPath="currentPath"/>
    <el-table
      :data="tableData">
      <el-table-column
        prop="directoryName"
        label="名称"
        width="650">
        <template v-slot:default="scope">
          <el-link v-if="scope.row.isDirectory" v-on:click="getDirectories(scope.row)" :underline="false">{{scope.row.directoryName}}</el-link>
          <el-link v-else disabled v-on:click="getDirectories(scope.row)" :underline="false">{{scope.row.directoryName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        label="修改时间"
        width="210">
      </el-table-column>
      <el-table-column
        prop="size"
        label="大小"
        width="110">
        <template v-slot:default="scope" >
          <span v-if="!scope.row.isDirectory">{{convertByte(scope.row.size)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template  v-slot:default="scope">
          <el-link v-if="!scope.row.isDirectory"  :underline="false" type="primary" :href="['https://gaoyubo.cn:8888/file/download?directoryPath='+scope.row.directoryPath.replace(/\\/g,'//')]" download>下载</el-link>
          <el-link v-else underline disabled>下载</el-link>
          <el-link style="padding-left: 20px" :underline="false" type="danger">删除</el-link>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>

<script>
import FileUpload from "./FileUpload.vue";

export default {
  components: {FileUpload},
  methods: {
    downLoad(row) {
      console.log(row);
    },
    convertByte(bytes){
      if (bytes === 0) return "1"
      const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      let size = bytes;
      let unitIndex = 0;

      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      // 保留两位小数，四舍五入
      size = Math.round(size * 100) / 100;
      return `${size} ${units[unitIndex]}`;
    },
    getDirectories(row){
      let directoryName = String(row.directoryPath);
      var reg = /\\/g;
      directoryName = directoryName.replace(reg, '//');
      console.log(directoryName)
      if (row.isDirectory === true){
        this.$store.dispatch("getDirectories",{directoryName}).then((res)=>{
          this.currentPath = row.directoryPath;
          this.tableData = res.directories;
          this.breadcrumbItems.push({ directoryName: row.directoryName, directoryPath: row.directoryPath });
        });
      }
    },
    navigate(path) {
      console.log("点击了导航栏：")
      console.log(path)
      // 处理导航到指定路径的操作
      var reg = /\\/g;
      let newPath = path.replace(reg, '//');
      this.currentPath = newPath;
      this.loadTableData(newPath);
      //清除
      this.breadcrumbItems = this.breadcrumbItems.slice(0, this.breadcrumbItems.findIndex(item => item.directoryPath === path) + 1);
    },
    loadTableData(path) {
      let  directoryName = path;
      this.$store.dispatch("getDirectories",{directoryName}).then((res)=>{
        this.tableData = res.directories;
        // this.breadcrumbItems.push({ directoryName: row.directoryName, directoryPath: row.directoryPath });
      });
    },
  },
  created() {
    this.session = JSON.parse(localStorage.getItem("session"))
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
  },
  mounted() {
    let directoryName = this.directoryName;
    this.$store.dispatch("getDirectories",{directoryName}).then((res)=>{
      this.tableData = res.directories;
    });
  },

  data() {
    return {
      userInfo:{},
      session:{},
      breadcrumbItems:[],
      currentPath: '/', // 当前路径
      directoryName: '/',
      tableData: [],
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  }
}
/**
 * 根据字节数获取文件大小，并转换成 KB、MB、GB、TB 等形式
 * @param {number} bytes - 文件的字节数
 * @returns {string} - 文件大小的字符串表示形式
 */
</script>
<style>
.el-breadcrumb-item:hover {
  cursor: pointer;
}
.welcome{
  margin-bottom: 10px;
  margin-left: 800px;
}
</style>
