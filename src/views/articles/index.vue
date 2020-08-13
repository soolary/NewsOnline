<template>
  <div class="articles">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <Breadcrumb></Breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form :model="form" ref="form">
        <el-form-item label="状态" class="radio">
          <el-radio-group v-model="radio">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道下拉菜单 -->
        <el-form-item label="频道" class="select">
          <el-select v-model="value" placeholder="请选择频道">
            <!-- value选项的值 label选项的标签 -->
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" class="block">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bot-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件红查询到{{ total }}条结果,当前是{{ page }}页</span>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column label="封面" width="250">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" alt="" class="avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="250">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 1"
              >待审核</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 2"
              >审核通过</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 3"
              >审核失败</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 4"
              >已删除</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="250">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editArticle(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="dele(scope.row.id)"
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import moment from 'moment'
import { getchannels } from '../../api/addArticle'
import { getArticle, deleteArticle } from '../../api/articles'
export default {
  name: 'articles',
  data () {
    return {
      radio: null,
      options: [],
      value: null,
      form: {},
      page: 1,
      total: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: '',
      tableData: []
    }
  },
  filters: {
    formTime (value1) {
      return moment(value1).format('YYYY-MM-DD')
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getData()
    },
    dele (id) {
      console.log(id)
      deleteArticle({ target: id.toString() })
        .then(res => {
          console.log(res)
          this.$message.success('删除成功')
          this.getData()
        })
        .catch(() => {
          this.$message.warning('删除失败')
        })
    },
    search () {
      console.log('radio', this.radio)
      console.log('value', this.value)
      console.log('value1', this.value1)
      if (this.value1) {
        var date1 = moment(this.value1.join().split(',')[0]).format(
          'YYYY-MM-DD'
        )
        var date2 = moment(this.value1.join().split(',')[1]).format(
          'YYYY-MM-DD'
        )
      }
      // console.log(date1, date2)
      getArticle({
        page: this.page,
        status: this.radio,
        channel_id: this.value,
        begin_pubdate: date1,
        end_pubdate: date2
      }).then(res => {
        window.console.log('resData', res)
        this.tableData = []
        this.$nextTick(() => {
          this.tableData = res.data.data.results
          this.page = res.data.data.page
          this.total = res.data.data.total_count
        })
      })
    },
    getData () {
      getArticle({ page: this.page }).then(res => {
        console.log('getArticle', res)
        this.tableData = res.data.data.results
        this.page = res.data.data.page
        this.total = res.data.data.total_count
      })
    },
    editArticle (id) {
      id = id.toString()
      this.$router.push(`/editArticle/${id}`)
    }
  },
  created () {
    getchannels().then(res => {
      // console.log('getchannels', res)
      this.options = res.data.data.channels
      console.log(this.options)
    })
    this.getData()
  }
}
</script>
<style lang="less">
.articles {
  .avatar {
    height: 100px;
    width: 150px;
  }
  .top-card {
    margin-bottom: 30px;
    .clearfix {
      el-button {
        float: left;
        font-size: 30px;
      }
    }
    .radio {
      margin-bottom: 30px;
    }
    .select {
      margin-bottom: 30px;
    }
    .block {
      margin-bottom: 30px;
    }
    .btn {
      margin-left: 50px;
    }
  }
  .bot-card {
    .paging {
      margin-top: 10px;
    }
  }
}
</style>
