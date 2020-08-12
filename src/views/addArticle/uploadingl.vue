<template>
  <div class="uploadingl">
    <el-dialog
      :visible.sync="showone"
      width="720px"
      :modal-append-to-body="false"
    >
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="素材库" name="first">
            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
              <el-radio-button label="全部"> </el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item, index) in 6" :key="index">
                <div class="grid-content"><img src="" alt="" />123</div></el-col
              >
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showone = false">取 消</el-button>
        <el-button type="primary" @click="showone = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showone: false,
      activeName: 'first',
      imageUrl: '',
      tabPosition: '全部'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 图片上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 20

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style lang="less">
.uploadingl {
  .el-dialog__footer {
    .dialog-footer {
      text-align: right;
    }
  }
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
  }
  .avatar-uploader {
    text-align: center;
  }
}
</style>
