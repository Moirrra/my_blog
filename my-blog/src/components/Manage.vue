<template>
  <div id="manage">
    <div class="manage-wrap">
      <h1 class="manage-title">全部文章</h1>
      <div class="manage-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="title" label="标题" width="250">
          </el-table-column>
          <el-table-column prop="date" label="发布时间" sortable width="220" column-key="date">
          </el-table-column>
          <el-table-column prop="labels" label="标签">
            <template slot-scope="scope">
              <el-tag class="tag" v-for="(item,index) in scope.row.labels" :key="index">{{ item }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button type="text" @click="handleView(scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Manage',
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    async getData() {
      console.log('getArticleList')
      let result = await this.$API.reqArticleList()
      if (result.status == 0) {
        console.log('获取文章列表成功！')
        this.tableData = result.data
      } else {
        console.log('获取文章列表失败！')
      }
    },
    handleView(row) {
      if (row.title == 'About') this.$router.push('/about')
      else {
        console.log(row._id)
        let location = {
          name: 'detail',
          query: {
            id: row._id,
          }
        }
        this.$router.push(location)
      }
    },
    handleEdit(row) {
      console.log(row._id)
        let location = {
          name: 'edit',
          query: {
            id: row._id,
          }
        }
      this.$router.push(location)
    },
    handleDelete(row) {
      console.log(row._id)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.deleteArticle(row._id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async deleteArticle(id) {
      let result = await this.$API.reqDeleteArticle({id: id})
      if (result.status == 0) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getData()
        this.$bus.$emit('updateData')
      } else {
        this.$message({
            type: 'danger',
            message: '删除失败！'
        })
      }
    }
  },
  mounted() {
    this.getData()
  },

}
</script>
<style scoped>
  #manage {
    width: 100%;
    margin: 0 8px;
  } 
  .manage-wrap {
    padding: 20px;
    min-height: 650px;
    background-color: #fff;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .manage-title {
    margin-bottom: 50px;
  }

  .tag {
    margin-right: 5px;
  }
  </style>