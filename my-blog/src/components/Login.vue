<template>
  <div id="login">
    <div class="login-container">
      <h3 class="title">个人博客系统</h3>
      <input type="text" v-model="username" @focus="handleFocus" placeholder="请输入用户名"> 
      <input type="password" v-model="password" @focus="handleFocus" placeholder="请输入密码">
      <div class="button-list">
        <button class="btn-register" @click="register">注册</button>
        <button class="btn-login" @click="login">登录</button>
      </div>
      <div class="tip" v-show="showTip">提示：用户名：1-12个字符 密码：6-20个字符</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      showTip: false,
    }
  },
  methods: {
    async login() {
      console.log('login')
      try {
        const { username, password } = this
        if (username && password) {
          let result = await this.$store.dispatch('userLogin', {username, password})
          if (result == 0) {
            this.$message({
              message: '登录成功！',
              type: 'success'
            })
            // 成功跳转至首页
            this.$router.push(`/${username}/home`)
          } else {
            console.log('login failed')
            this.$message.error('登录失败！用户名或密码错误！')
          }
        } else {
          this.$message.error('用户名或密码不能为空！')
        }
      } catch (error) {
        this.$message.error('登录失败！用户名或密码错误！')
      }
    },
    async register() {
      console.log('register')
      try {
        const { username, password } = this
        if (username && password) {
          let result = await this.$store.dispatch('userRegister', {username, password})
          if (result.status == 0) {
            // 成功跳转至首页
            this.$router.push(`/${username}/home`)
          } else {
            this.$message.error('注册失败！用户名或密码错误！')
          }
        } else {
          this.$message.error('用户名或密码不能为空！')
        }
      } catch (error) {
        this.$message.error('注册失败！用户名或密码错误！')
      }
    },
    handleFocus() {
      this.showTip = true
    },
  }
}
</script>

<style scoped>
  #login {
    margin: 200px auto;
    position: relative;
  }
  .login-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    -webkit-transform:translate(-50%,-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
  }

  .title {
    margin-bottom: 30px;
    font-size: 20px;
  }

  input {
    margin-bottom: 10px;
    padding: 0 20px;
    width: 250px;
    height: 40px;
    border: none;
    border-radius: 20px;
  }

  input:focus {
    outline: 1px solid #409EFF;
  }

  .button-list {
    display: flex;
  }

  .button-list button {
    margin-top: 10px;
    margin-right: 10px;
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-register {
    background-color: #fff;
  }

  .btn-login {
    background-color: #409EFF;
    color: #fff;
  }

  .tip {
    margin-top: 10px;
    color: #409EFF;
    font-size: 12px;
  }
</style>