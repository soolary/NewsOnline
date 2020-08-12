<template>
  <div class="articles">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <Breadcrumb></Breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form :model="form">
        <el-form-item label="状态" class="radio">
          <el-radio-group v-model="radio">
            <el-radio :label="1">全部</el-radio>
            <el-radio :label="2">草稿</el-radio>
            <el-radio :label="3">待审核</el-radio>
            <el-radio :label="4">审核通过</el-radio>
            <el-radio :label="5">审核失败</el-radio>
            <el-radio :label="6">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 频道下拉菜单 -->
        <el-form-item label="频道" class="select">
          <el-select v-model="value" placeholder="请选择频道">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期" class="block">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bot-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件红查询到1234条结果</span>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column prop="cover" label="封面" width="250">
          <img src="../../assets/avatar.jpg" alt="" />
        </el-table-column>
        <el-table-column prop="title" label="标题" width="250"
          >我是标题
        </el-table-column>
        <el-table-column prop="status" label="状态" width="180"
          ><el-tag type="success">状态</el-tag>
        </el-table-column>
        <el-table-column prop="date" label="发布时间" width="250">
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="250">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'articles',
  data () {
    return {
      radio: '',
      form: {},
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      value: [],
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        }
      ]
    }
  }
}
</script>
<style lang="less">
.articles {
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
