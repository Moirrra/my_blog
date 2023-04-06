<template>
  <div id="edit-wrap">
    <div class="return session">
      <button class="btn-back" @click="goBack">
        < 返回
      </button>
      <h1 class="session-title">文章编辑</h1>
    </div>
    <div class="edit-area">
      <div class="edit-title session">
        <h3>标题</h3>
        <input type="text" class="input-title text" v-model="title" placeholder="请输入标题">
      </div>
      <div class="tags-wrap session">
        <h3>标签</h3>
        <div class="tags-list">
          <el-tag v-for="tag in labels" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
      <div class="edit-summary session">
        <h3>简介</h3>
        <textarea class="summary-editor text" v-model="summary" rows="3">这里放简介</textarea>
      </div>
      <div class="edit-content session">
        <h3>内容&nbsp;(Markdown编辑器)</h3>
        <div class="markdown">
          <textarea class="markdown-input  text" v-model="content" rows="10" @input="handleInput"></textarea>
          <div class="markdown-compiled text" v-html="compileContent"></div>
        </div>
        <div class="save-button">
          <button class="btn-save" @click="post" v-if="!this.$route.query.id">发布</button>
          <button class="btn-save" @click="update" v-if="this.$route.query.id">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { marked } from 'marked'
import highlight from 'highlight.js'
import '../assets/style/atom-one-light.css'
import * as DOMPurify from 'dompurify'


export default {
  name: 'Edit',
  data() {
    return {
      title: '',
      date: '',
      content: '',
      summary: '',
      labels: [],
      inputVisible: false,
      inputValue: '',
      compileContent: '',
    }
  },
  methods: {
    // 获取文章信息
    async getData() {
      if (this.$route.query.id) {
        console.log('getData:', this.$route.query.id)
        let result = await this.$API.reqArticleInfo(this.$route.query.id)
        if (result.status == 0) {
          let article = result.data
          this.title = article.title
          this.date = article.date
          this.content = article.content
          this.summary = article.summary
          this.labels = article.labels
          this.compileContent = DOMPurify.sanitize(marked.parse(this.content).replace(/<pre>/g, "<pre class='hljs'>"))
          console.log('获取文章信息成功！')
        } else {
          console.log('获取文章信息失败！')
        }
      }
    },
    // markdown配置
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
    // 获取日期时间
    getDate() {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date()
      y = mydate.getFullYear()
      m = mydate.getMonth()
      d = mydate.getDate()
      hh = mydate.getHours()
      mm = mydate.getMinutes()
      ss = mydate.getSeconds()
      if (m < 10) m = '0' + m
      if (d < 10) d = '0' + d
      if (hh < 10) hh = '0' + hh
      if (mm < 10) mm = '0' + mm
      if (ss < 10) ss = '0' + ss
      this.date = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    },
    // 发布
    async post() {
      console.log('post')
      this.getDate()
      const { title, date, content, summary, labels } = this
      if (!title || !content) {
        this.$message.error('发布文章失败！标题和内容不能为空！')
        return
      }
      let result = await this.$API.reqSaveArticle({ title, date, content, summary, labels })
      if (result.status == 0) {
        const _this = this
        this.$alert('文章保存成功!', '消息提示', {
          confirmButtonText: '确定', callback: function () {
            _this.$router.push('/')
            console.log('发布文章成功！')
          }
        })
      } else {
        this.$message.error('发布文章失败！')
      }
    },
    // 更新
    async update() {
      console.log('update')
      this.getDate()
      const { title, date, content, summary, labels } = this
      if (!title || !content) {
        this.$message.error('更新文章失败！标题和内容不能为空！')
        return
      }
      let result = await this.$API.reqUpdateArticle({id:this.$route.query.id, title, date, content, summary, labels })
      if (result.status == 0) {
        const _this = this
        this.$alert('更新文章成功!', '消息提示', {
          confirmButtonText: '确定', callback: function () {
            let location = {
              name: 'detail',
              query: {
                id: _this.$route.query.id,
              }
            }
            _this.$router.push(location)
            console.log('更新文章成功！')
          }
        })
      } else {
        this.$message.error('更新文章失败！')
      }
    },
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 延迟赋值给content
    handleInput() {
      _.debounce(function (e) {
        this.content = e.target.value
      }, 1000)
    },

    handleClose(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.labels.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
  watch: {
    content(newVal) {
      this.compileContent = DOMPurify.sanitize(marked.parse(newVal).replace(/<pre>/g, "<pre class='hljs'>"))
    }
  },
  mounted() {
    this.markedConfig()
    this.getData()
  },
}
</script>

<style scoped>
#edit-wrap {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  min-height: 650px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  /* font-size: 16px; */
}

h3 {
  font-size: 18px;
  text-align: left;
  margin-bottom: 5px;
}

.btn-back {
  border: none;
  width: 80px;
  height: 50px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
}

.session-title {
  text-align: left;
  margin-left: 25px;
  margin-bottom: 10px;
}

.tags-list {
  text-align: left;
}

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.edit-area {
  margin: 10px 10px;
  padding-left: 10px;
  text-align: center;
}

.text {
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #999;
  border-radius: 5px;
  outline: none;
  resize: none;
}

.session {
  margin-bottom: 10px;
}

.input-title {
  width: 100%;
  height: 35px;
}

.summary-editor {
  width: 100%;
}

.edit-content {
  width: 100%;
}

.markdown {
  display: flex;
}

.markdown-input {
  flex: 1;
  margin-right: 10px;
}

.markdown-compiled {
  flex: 1;
  text-align: left;
  background-color: #eee;
  overflow-y: auto;
}

.save-button {
  text-align: left;
  margin-top: 10px;
}

.btn-save {
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #409EFF;
  color: #fff;
}
</style>