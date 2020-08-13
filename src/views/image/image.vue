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
          v-model="reqParams.collect"
          style="margin-bottom: 30px;"
          @change="toggleList"
          size="small"
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
        <div class="item-box" v-for="(item, index) in images" :key="index">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :class="{ red: item.is_collected }"
            ></span>
            <span @click="del(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- <div v-else class="list-box">
        <div
          class="item-box"
          v-for="(item, index) in collectImage"
          :key="index"
        >
          <img :src="item.url" alt />
        </div>
      </div> -->

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        hide-on-single-page
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
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
        :action="uploadUrl"
        :headers="headers"
        name="image"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, delImages, colImages } from '../../api/image.js'
import { getUser } from '@/utils/storage.js'
export default {
  name: 'images',
  created () {
    this.getdata()
  },
  data () {
    return {
      imageUrl: '',
      //   总条数
      uploadUrl: 'http://ttapi.research.itcast.cn/mp/v1_0/user/images',
      total: 0,
      dialogTableVisible: false,
      //   查询条件
      reqParams: {
        //   是否查的收藏 true查询收藏  false查询全部
        collect: false,
        page: 1,
        per_page: 10
      },
      //   素材列表
      images: [],
      //   collectImages: [],
      //   collectImage: [],
      headers: { Authorization: `Bearer ${getUser().token}` }
    }
  },
  methods: {
    // 切换全部和收藏
    toggleList () {
      this.reqParams.page = 1
      this.getdata()
    },
    // 切换分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getdata()
    },
    // 封装获取数据
    getdata () {
      const query = {
        page: this.reqParams.page,
        per_page: this.reqParams.per_page,
        collect: this.reqParams.collect
      }
      getImages(query).then(res => {
        window.console.log(res)
        this.images = res.data.data.results

        //   设置总条数results.length
        this.total = res.data.data.total_count
      })
    },
    // 删除素材
    del (id) {
      console.log(id)
      // 确认框
      this.$confirm('此操作将永久删除该图片素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delImages({ target: id.toString() }).then(res => {
          console.log(res)
          this.getdata()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    // 进行 添加收藏||取消收藏
    toggleStatus (item) {
      //   console.log(item)
      // （将要）修改后的状态
      const updatedStatus = !item.is_collected
      // 发请求
      colImages({
        // 和当前图片状态取反即可，当前已收藏--->取消收藏  当前未收藏--->添加收藏
        target: item.id,

        collect: updatedStatus
      }).then(res => {
        console.log('res', res)
      })
      // 成功提示
      this.$message.success(updatedStatus ? '添加收藏成功' : '取消收藏成功')
      // 根据修改后的状态去改 星星的颜色，修改图片数据对应的状态is_collected即可
      item.is_collected = updatedStatus
    },
    // 上传成功处理
    handleAvatarSuccess (res, file) {
      //   console.log('1' + res)
      //   uplImages().then(res => {
      //     console.log('2' + res)
      //   })
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$message.success('上传素材成功')
      window.setTimeout(() => {
        this.dialogTableVisible = false
        this.getdata()
        this.imageUrl = ''
      }, 3000)
    },
    // 上传前处理
    beforeAvatarUpload (file) {
      console.log(file)
      const isJPG =
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png'

      const isLt2M = file.size / 1024 / 1024 < 2

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
.avatar-uploader {
  text-align: center;
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
</style>
