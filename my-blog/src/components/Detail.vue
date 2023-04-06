<template>
  <div id="content">
    <div class="detail-wrap">
      <div class="detail-header">
        <h1 class="detail-title">{{ article.title }}</h1>
        <div class="detail-info">
          <span class="info-item">
            <span class="detail-info-date">发布于：{{ article.date }}</span>
          </span>
          <span class="info-item">标签：
            <span class="detail-info-tag" v-for="(tag, index) in article.labels" :key="index">
              <a class="info-tag-link">
                <span class="info-tag-name">{{ tag }}</span>
              </a>
            </span>
          </span>
        </div>
      </div>
      <div class="detail-body" v-html="compileContent">
      </div>
    </div>
    <div class="edit-button">
      <el-button icon="el-icon-edit" circle @click="goEdit(article._id)"></el-button>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import highlight from 'highlight.js'
import '../assets/style/atom-one-light.css'
import * as DOMPurify from 'dompurify'

export default {
  name: 'Detail',
  data() {
    return {
      article: {},
      compileContent: '',
    }
  },
  methods: {
    markedConfig() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code) {
          return highlight.highlightAuto(code).value
        },
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      })
    },
    async getArticle() {
      let result = await this.$API.reqArticleInfo(this.$route.query.id)
      if (result.status == 0) {
        this.article = result.data
        this.compileContent = DOMPurify.sanitize(marked.parse(this.article.content).replace(/<pre>/g, "<pre class='hljs'>"))
        console.log('获取文章信息成功！')
      } else {
        console.log('获取文章信息失败！')
      }
    },
    goEdit(id) {
      let location = {
        name: 'edit',
        query: {
          id: id,
        }
      }
      this.$router.push(location)
    },
  },
  mounted() {
    this.markedConfig()
    this.getArticle()
  },
}
</script>

<style scoped>
#content {
  width: 100%;
  margin: 0 8px;
}

.detail-wrap {
  min-height: 650px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  padding: 40px;
  margin-bottom: 10px;
}

.detail-header {
  text-align: center;
  margin-bottom: 80px;
}


.detail-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: #999;
}

.info-item:not(:first-child)::before {
  content: '|';
  margin: 0 8px;
}

.detail-info-tag {
  margin: 0 2px;
}

.detail-info-tag:not(:last-child)::after {
  content: ',';
}

.info-tag-name {
  border-bottom: 1px solid #999;
}

.detail-body {
  font-size: 16px;
}

.edit-button {
  position: fixed;
  bottom: 50px;
  right: 25%;
  z-index: 999;
}
</style>