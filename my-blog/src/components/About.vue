<template>
  <div id="about">
    <div class="about-wrap">
      <h1 class="about-title">关于</h1>
      <div class="about-body" v-html="compileContent">
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import highlight from 'highlight.js'
import '../assets/style/atom-one-light.css'
import * as DOMPurify from 'dompurify'

export default {
  name: 'About',
  data() {
    return {
      content: '',
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
    async getData() {
      // let result = await this.$API.reqAbout()
      console.log('reqAboutByUsername')
      let result = await this.$API.reqAboutByUsername(this.$route.params.username)
      if (result.status == 0) {
        const article = result.data
        this.content = article.content
        this.compileContent = DOMPurify.sanitize(marked.parse(this.content).replace(/<pre>/g, "<pre class='hljs'>"))
      } else {
        this.content = '未获取到数据，请保存标题为"About"的文章'
        this.compileContent = DOMPurify.sanitize(marked.parse(this.content).replace(/<pre>/g, "<pre class='hljs'>"))
      }
    }
  },
  mounted() {
    this.markedConfig()
    this.getData()
  },
}
</script>

<style scoped>
#about {
  width: 100%;
  margin: 0 8px;
}

.about-wrap {
  padding: 40px;
  min-height: 650px;
  font-size: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.about-body p {
  margin: 0 0 20px;
}

.about-title {
  text-align: center;
  overflow-wrap: break-word;
  margin-bottom: 50px;
}
</style>