<template>
  <div class="sidebar">
    <div id="header">
      <div class="brand-name">{{ author }}'s Blog</div>
      <nav class="site-nav">
        <ul class="menu">
          <router-link :to="`/${author}/home`" active-class="active">
            <li class="home" :style="{ backgroundColor: this.$route.path == '/' ? activeColor : '' }">
              首页
            </li>
          </router-link>
          <router-link :to="`/${author}/about`">
            <li class="about" :style="{ backgroundColor: this.$route.path == '/about' ? activeColor : '' }">
              关于
            </li>

          </router-link>
          <router-link :to="`/${author}/manage`" v-show="username === author">
            <li class="manage" :style="{ backgroundColor: this.$route.path == '/manage' ? activeColor : '' }">管理</li>
          </router-link>
          <router-link :to="`/${author}/edit`" v-show="username && username === author">
            <li class="edit">写文章</li>
          </router-link>
          <router-link to="/login" v-if="!username">
            <li class="login">登录</li>
          </router-link>
          <li class="logout" v-if="username" @click="logout">登出</li>
        </ul>
      </nav>
    </div>
    <div id="info">
      <img :src="avatar" alt="" class="img-avatar">
      <div class="user-name">{{ author }}</div>
      <div class="slogan">学无止境</div>
      <div class="article-stat">
        <span class="article-num">{{ postNum }}</span>
        <span class="article">日志</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Sidebar',
  data() {
    return {
      activeColor: '#f5f5f5',
      author:'',
      avatar: '',
      postNum: 0,
    }
  },
  methods: {
    async getUserInfo() {
      if (this.$route.params.username) {
        let result = await this.$API.reqUserInfoByUsername(this.$route.params.username)
        if (result.status == 0) {
          let userInfo = result.data
          this.author = userInfo.username
          this.avatar = userInfo.avatar ? userInfo.avatar : require('../assets/images/default.png')
        } else {
          console.log('获取作者信息失败！')
        }
      }
    },
    async getPostNum() {
      let result = await this.$API.reqArticleListByUsername(this.$route.params.username)
      if (result.status == 0) {
        let articleList = result.data
        articleList = articleList.filter(item => item.title != 'About')
        this.postNum = articleList.length
      } else {
        console.log('获取日志数量失败！')
      }
    },
    logout() {
      this.$store.dispatch('userLogout')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(['username'])
  },
  mounted() {
    this.getUserInfo()
    this.getPostNum()
    this.$bus.$on('updateData',this.getPostNum)
  },
  beforeDestroy() {
    this.$bus.$off('updateData')
  }
}
</script>

<style>
.sidebar {
  float: right;
  width: 280px;
  /* height: 800px; */
  height: 100%;
  /* margin: 0 20px; */
  padding: 0 10px;
  text-align: center;
}

@media (max-width: 800px) {
  .sidebar {
    display: none;
  }
}

#header {
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.brand-name {
  padding: 20px 0px;
  background-color: #222;
  color: #fff;
  font-size: 24px;
}

.site-nav {
  padding: 16px 0;
  text-align: left;
}

.menu li {
  display: flex;
  align-items: center;
  padding: 0 30px;
  height: 36px;
  cursor: pointer;
}

.active,
.menu li:hover {
  background-color: #f5f5f5;
}

#info {
  padding: 18px 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.img-avatar {
  width: 125px;
  height: 125px;
  border-radius: 125px;
}

.user-name {
  font-size: 16px;
  font-weight: 700;
}

.slogan,
.article {
  color: #999;
}


.article-stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}

.article-num {
  font-size: 16px;
  font-weight: 700;
  height: 25px;
}
</style>