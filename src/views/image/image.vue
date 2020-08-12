<template>
  <div>
    <el-card class="box-card">
      <!-- 顶部 -->
      <div slot="header" class="clearfix">
        <Breadcrumb></Breadcrumb>
      </div>
      <!-- tab导航栏 -->
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="收藏"></el-radio-button>
      </el-radio-group>
        <!-- 上传按钮 -->
        <el-button
          style="margin-left: 10px; float:right;"
          size="small"
          type="success"
          @click="dialogTableVisible = true"
          >上传到服务器</el-button
        >

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
      tabPosition: 'left',
      dialogTableVisible: false,
      dialogFormVisible: false
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

</style>
