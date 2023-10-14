<template>
  <el-table
    :data="tableData">
    <el-table-column
      prop="directoryName"
      label="名称"
      width="700">
      <template v-slot:default="scope">
        <el-button @click="getDirectories(scope.row)" type="text" size="small">{{scope.row.directoryName}}</el-button>
      </template>


    </el-table-column>
    <el-table-column
      prop="createdAt"
      label="修改时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="size"
      label="大小"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template v-slot:default="scope">
        <el-button @click="downLoad(scope.row)" type="text" size="small">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  methods: {
    downLoad(row) {
      console.log(row);
    },
    getDirectories(row){
      let directoryName = String(row.directoryPath);
      var reg = /\\/g;
      directoryName = directoryName.replace(reg, '//');
      console.log(directoryName)
      if (row.isDirectory === true){
        this.$store.dispatch("getDirectories",{directoryName}).then((res)=>{
          console.log(res)
          this.tableData = res.directories;
        });
      }

    }
  },
  mounted() {
    let directoryName = this.directoryName;
    this.$store.dispatch("getDirectories",{directoryName}).then((res)=>{
      console.log(res)
      this.tableData = res.directories;
    });
  },

  data() {
    return {
      directoryName: '/',
      tableData: [],
    }
  }
}
</script>
