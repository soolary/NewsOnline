<template>
  <div class="fans">
    <div class="title">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <div class="main-box">
            <el-row>
              <el-col>
                <el-card :body-style="{ padding: '0px' }">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                  <div style="padding: 14px;">
                    <span>好吃的汉堡</span>
                    <div class="bottom clearfix">
                      <time class="time">{{ currentDate }}</time>
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
            <el-pagination background layout="prev, pager, next" :total="110">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.fans {
  width: 1279;
  background-color: #fff;
  padding: 15px;
  .title {
    background-color: #fff;
  }
  .main-box {
    margin-bottom: 30px;
    .el-card {
      width: 120px;
      height: 180px;
      text-align: center;
      padding-top: 12px;
      padding-bottom: 15px;
      box-shadow: none;
      border: 1px dashed #ddd;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
      .el-button {
        margin-top: 10px;
      }
    }
  }
}
</style>
