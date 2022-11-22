<!--  -->
<template>
  <div>
    <el-form :rules="rules"
             ref="loginForm"
             :model="loginForm"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             @keydown.enter.native="submitLogin"
             class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text"
                  auto-complete="false"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password"
                  auto-complete="false"
                  v-model="loginForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
        <el-input type="text"
                  auto-complete="false"
                  v-model="loginForm.code"
                  placeholder="点击图片更换验证码"
                  style="width: 250px; margin-right: 5px"></el-input>
        <img :src="captchaUrl"
             @click="updateCaptcha">
      </el-form-item> -->
      <el-checkbox v-model="checked"
                   class="loginRemember">记住我</el-checkbox>
      <el-button type="primary"
                 style="width: 100%"
                 @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>

import qs from 'qs'

export default {
  name: 'Login',
  data () {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        //code: ''
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }],
        //   code: [
        //     { required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      loading: false
    }
  },
  methods: {
    updateCaptcha () {
      this.captchaUrl = '/captcha?time=' + new Date()
    },
    submitLogin () {

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          //console.log(this.loginForm);
          this.postRequest('/login', qs.stringify(this.loginForm)).then(res => {
            if (res) {
              //console.log(res)
              this.loading = false

              console.log(res);
              //存储用户token
              const tokenStr = res.obj.authorization
              window.sessionStorage.setItem('token', tokenStr)
              // //跳转首页

              this.$router.replace('/home')
              // let path = this.$route.query.redirect
              // this.$router.replace((path == '/' || path == undefined) ? '/home' : path)
            } else {
              this.loading = false
            }
          })
          //alert('submit!');
        } else {
          this.$message.error('请输入所有字段')
          this.loading = false
        }
      });
    }
  }
}

</script>
<style>
.loginContainer {
  border-radius: 15px;
  background-clip: border-box;
  margin: 188px auto;
  width: 358px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  text-align: center;
  margin: 0px auto 30px auto;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>