<template>
  <div class="fans">
    <Breadcrumb></Breadcrumb>
    <div class="title">
      <el-tabs type="card" @tab-click="handleClick" v-model="activeName">
        <el-tab-pane label="粉丝列表" name="first">
          <div class="main-box">
            <el-row v-for="(item, index) in fansList" :key="index">
              <el-col>
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.photo" class="image" />
                  <div style="padding: 14px;">
                    <span>{{ item.name }}</span>
                    <div class="bottom clearfix">
                      <time class="time"></time>
                      <el-button type="primary" plain size="small"
                        >+关注</el-button
                      >
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <div class="foot">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="110"
              @current-change="handleCurrentChange"
              :current-page.sync="pagination.currentPage"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second" @click.native="getEcharts">
          <div
            ref="charts"
            class="charts"
            style="width: 600px;height:400px;"
            v-show="isShowImg"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getFans, fansStatistics } from '../../api/fans'
export default {
  data () {
    return {
      fansList: [],
      pagination: {
        currentPage: 1
      },
      statistics: {},
      activeName: 'first',
      isShowImg: true
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.getEcharts()
  },
  methods: {
    handleClick (targetName) {
      // console.log(targetName.name)
      if (targetName.name === 'second') {
        this.getEcharts()
      }
    },
    getData () {
      const query = {
        page: this.pagination.currentPage
      }
      console.log(query)
      getFans(query).then(res => {
        window.console.log(res)
        this.fansList = res.data.data.results
      })
    },
    handleCurrentChange (page) {
      console.log(page)
      this.pagination.currentPage = page
      this.getData()
    },
    getEcharts () {
      const myChart = echarts.init(this.$refs.charts)
      const option = {
        tooltip: {},
        xAxis: {
          data: [
            '小于18岁',
            '小于23岁',
            '小于30岁',
            '小于40岁',
            '小于50岁',
            '大于50岁'
          ]
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [100, 80, 60, 40, 20, 0]
          }
        ]
      }
      fansStatistics()
        .then(res => {
          window.console.log(res)
          this.statistics = res.data.data.age

          var arr = []
          for (var i in this.statistics) {
            arr.push(this.statistics[i])
            //
          }
          // console.log(arr)
          option.series[0].data = arr
          myChart.setOption(option)
          this.isShowImg = true
        })
        .catch(err => {
          console.log(err)
          this.isShowImg = false
          this.$message.error('请重新加载')
        })
    }
  }
}
</script>

<style lang="less">
.fans {
  width: 1279px;
  background-color: #fff;
  padding: 15px;
  .title {
    margin-top: 30px;
    background-color: #fff;
  }
  .main-box {
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    .el-card {
      width: 120px;
      height: 180px;
      text-align: center;
      padding-top: 12px;
      padding-bottom: 15px;
      box-shadow: none;
      border: 1px dashed #ddd;
      margin-right: 30px;
      align-items: center;
      margin-top: 20px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
  }
}
</style>
