<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部 -->
      <div slot="header" class="clearfix">
        <Breadcrumb></Breadcrumb>
      </div>
      <!-- 按钮 -->
      <div class="btn-box">
        <!-- tab导航栏 -->
        <el-radio-group
          v-model="tabPosition.collect"
          style="margin-bottom: 30px;"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 上传按钮 -->
        <el-button
          style="margin-left: 10px; float:right;"
          size="small"
          type="success"
          @click="dialogTableVisible = true"
          >上传图片素材</el-button
        >
      </div>
      <!-- 列表 -->
      <div class="list-box">
        <div class="item-box" v-for="i in 8" :key="i">
          <img src="../../assets/avatar.jpg" alt />
          <div class="option">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </el-card>
    <!-- 弹出框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogTableVisible"
      :modal-append-to-body="false"
    >
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      //   查询条件
      tabPosition: {
        //   是否查的收藏 true查询收藏  false查询全部
        collect: false
      }
    }
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  /* text-align: center; */
}
.list-box {
  .item-box {
    display: inline-block;
    width: 180px;
    height: 180px;
    margin-right: 60px;
    border: 1px dashed #ddd;
    position: relative;
    margin-bottom: 20px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .option {
      width: 100%;
      height: 30px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      line-height: 30px;
      span {
        color: #fff;
        margin: 0 20px;
        // 不加&解析后：span .red{} 后代选择器
        // 加上&节后后：span.red{}  交集选择器
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
