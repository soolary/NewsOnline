<template>
  <div class="comment">
    <el-crad class="box-card">
      <div slot="header">
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="item">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="文章标题" prop="title" width="240">
          </el-table-column>
          <el-table-column
            label="总评论数"
            prop="total_comment_count"
            width="240"
          >
          </el-table-column>
          <el-table-column
            label="粉丝评论数"
            prop="fans_comment_count"
            width="240"
          >
          </el-table-column>
          <el-table-column label="评论状态" prop="comment_status" width="240">
            <template slot-scope="scope">
              <el-button
                type="primary"
                v-if="scope.row.comment_status === true"
                plain
                >关闭</el-button
              >
              <el-button
                type="success"
                v-else-if="scope.row.comment_status === false"
                plain
                >正常</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.comment_status ? 'primary' : 'danger'"
                @click="set(scope.row.id, !scope.row.comment_status)"
                >{{
                  scope.row.comment_status ? '打开评论' : '关闭评论'
                }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-crad>
  </div>
</template>
<script>
import { commentList, setStatus } from '../../api/comment'
export default {
  name: 'comment',
  data () {
    return {
      tableData: '',
      comment: 'comment',
      total: '',
      page: 1,
      allowComment: ''
    }
  },
  methods: {
    set (id, status) {
      // console.log('id', id.toString())
      console.log('status', status)
      // decodeURI(id) 解码
      setStatus({ article_id: id, allow_comment: status }).then(res => {
        console.log(res)
        this.allowComment = res.data.data.allow_comment
        this.getData()
      })
    },
    handleCurrentChange (val) {
      this.page = val
      commentList({ page: val, response_type: this.comment }).then(res => {
        // console.log('commList', res)
        this.tableData = res.data.data.results
        this.page = res.data.data.page
      })
    },
    getData () {
      commentList({ page: this.page, response_type: this.comment }).then(
        res => {
          console.log('commList', res)
          this.tableData = res.data.data.results
          this.total = res.data.data.total_count
          this.page = res.data.data.page
        }
      )
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less">
.comment {
  height: 100vh;
  background-color: #fff;
  .box-card {
    width: 100%;
  }
  .el-breadcrumb {
    padding-top: 15px;
    padding-left: 15px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
