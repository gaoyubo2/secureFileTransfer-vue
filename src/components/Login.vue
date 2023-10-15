<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">用户登录</h2>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" size="small">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" clearable placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '', // 用户名
        password: ''  // 密码
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let user = this.loginForm
          this.$store.dispatch("userLogin",user).then((res)=>{
            let userInfo = res.userInfo
            let session = res.session
            //存入内存
            localStorage.setItem("userInfo",JSON.stringify(userInfo))
            localStorage.setItem("session",JSON.stringify(session))
            this.$router.push({
              name: 'FileDataTable', // 使用路由名称
              params: { res } // 传递 res 参数
            });
          });
        } else {
          this.$message.error('请填写必要信息');
        }
      });
    }
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 350px;
  text-align: center;
}

.login-title {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
