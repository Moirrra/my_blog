<template>
  <div id="nav-wrap">
    <div class="nav-content">
      <div class="avatar">
        <img :src="avatar" alt="">
        <div class="name">{{ username }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavTop',
  data() {
    return {
      username: '',
      avatar: '',
    }
  },
  methods: {
    async getUserInfo() {
      let result = await this.$API.reqUserInfo()
      if (result.status == 0) {
        let userInfo = result.data
        this.username = userInfo.username 
        this.avatar = userInfo.avatar ? userInfo.avatar : require('../assets/images/default.png')
      } else {
        console.log('获取用户信息失败')
        this.username = '未登录'
        this.avatar = require('../assets/images/default.png')
      }
    },
  },
  mounted() {
    this.getUserInfo()
  },
}
</script>
<style scoped>
  #nav-wrap {

  }
  .nav-content {
    position: relative;
    width: 100%;
    height: 55px;
    background-color: #222;
    margin-bottom: 15px;
  }

  .avatar {
    position: absolute;
    top: 3px;
    right: 15px;
    margin: 0;
    text-align: center;
    font-size: 0;
  }

  .avatar img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }

  .name {
    color: #fff;
    font-size: 12px;
  }
</style>