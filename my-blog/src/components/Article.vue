<template>
  <div id="content">
    <div class="article-wrap" v-for="(item, index) in articleList" :key="index">
      <h2 class="article-title">{{ item.title }}</h2>
      <div class="article-info">
          <span class="meta-item">
            <span class="article-date">{{ item.date }}</span>
          </span>
          <span class="meta-item">
            <span class="article-tag" v-for="(tag, index) in item.labels" :key="index">
              <a class="article-tag-link">
                <span class="article-tag-name">{{ tag }}</span> 
              </a>
            </span>
          </span>
      </div>
      <p class="article-body">{{ item.summary }}</p>
      <button class="btn-read" @click="goDetail(item._id)">阅读全文 >></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data() {
    return {
      articleList: []
    }
  },
  methods: {
    goDetail(id) {
      let location = {
        name: 'detail',
        query: {
          id: id,
        }
      }
      this.$router.push(location)
    },
    async getArticleList() {
      console.log('getArticleList')
      // let result = await this.$API.reqArticleList()
      let result = await this.$API.reqArticleListByUsername(this.$route.params.username)
      if (result.status == 0) {
        console.log('获取文章列表成功！')
        this.articleList = result.data
        this.articleList = this.articleList.filter(item => item.title != 'About')
      } else {
        console.log('获取文章列表失败！')
      }
    }
  },
  mounted() {
    this.getArticleList()
  },
}
</script>

<style scoped>
  #content {
    width: 100%;
    margin: 0 8px;
  }

  .article-wrap {
    position: relative;
    height: 320px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
    margin-bottom: 10px;
    padding: 12px;
    text-align: center;
  }

  .article-title {
    font-size: 24px;
  }


  .article-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
    color: #999;
  }


  .meta-item:not(:first-child)::before {
    content: '|';
    margin: 0 8px;
  }

  .article-tag {
    margin: 0 2px;
  }

  .article-tag:not(:last-child)::after {
    content: ',';
  }

  .article-tag-name {
    border-bottom: 1px solid #999;
  }


  .article-body {
    text-align: left;
    margin-bottom: 20px;
    padding: 0 20px;
    font-size: 16px;
  }

  .btn-read {
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translateX(-50%);
    width: 110px;
    height: 32px;
    /* margin: auto; */
    border: 2px solid #555;
    background-color: #fff;
    cursor: pointer;
  }

  .btn-read:hover {
    background-color: #555;
    color: #fff;
  }
</style>