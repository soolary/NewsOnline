<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部 -->
      <div slot="header" class="clearfix">
        <span class="shouye">首页</span>
        <span class="el-icon-arrow-right"></span>
        <span class="guanli">素材管理</span>
        <!-- 上传按钮 -->
        <el-button
          class="anniu"
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="dialogTableVisible = true"
          >上传到服务器</el-button
        >
      </div>
      <!-- tab导航栏 -->

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        class="fenye"
      >
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
      dialogFormVisible: false
    }
  }
}
</script>

<style>
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

.anniu {
  background-color: #67c23a;
  color: #fff;
  float: right;
}
.tupian1 {
  /* margin-right: 204px; */
  width: 134px;
  height: 134px;
}
.tupian2 {
  margin-right: 204px;
  width: 134px;
  height: 134px;
}

.el-icon-arrow-right {
  font-size: 18px;
  color: #8f99ab;
}
.shouye {
  font-weight: 700;
}
.guanli {
  color: #8f99ab;
}
</style>
