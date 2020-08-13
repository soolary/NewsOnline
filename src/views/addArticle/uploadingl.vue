<template>
  <div class="uploadingl">
    <!-- <div class="coverimg">
      <img :src="value || defaultImage" alt="" class="cover" @click="pop_up" />
    </div> -->
    <el-dialog
      :visible.sync="showone"
      width="720px"
      :modal-append-to-body="false"
    >
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="素材库" name="first">
            <el-radio-group
              v-model="tabPosition"
              style="margin-bottom: 30px;"
              @change="getpage"
            >
              <el-radio-button :label="0"> 全部</el-radio-button>
              <el-radio-button :label="1">收藏</el-radio-button>
            </el-radio-group>
            <el-row :gutter="20">
              <el-col :span="4" v-for="item in listimg" :key="item.id">
                <div class="grid-content">
                  <img :src="item.url" alt="" /></div
              ></el-col>
            </el-row>
            <!-- 分页 -->
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :total="total"
              v-if="total > 1"
            >
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="headers"
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
        <el-button type="primary" @click="onensure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入接口
import { getuserimages } from '../../api/addArticle.js'
import { getUser } from '@/utils/storage.js'
import defaultImage from '@/assets/default.png'
export default {
  props: ['value'],
  data () {
    return {
      // 分页
      page: 1,
      total: 1,
      per_page: 12,
      listimg: [],
      defaultImage,
      showone: true,
      activeName: 'first',
      imageUrl: '',
      tabPosition: '0',
      headers: {
        Authorization: `Bearer ${getUser().token}`
      }
    }
  },
  created () {
    this.getpage()
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.getpage()
    },
    // 分页方法
    getpage () {
      getuserimages({
        per_page: this.per_page,
        page: this.page,
        collect: this.tabPosition
      }).then(res => {
        console.log('图片', res)
        this.listimg = res.data.data.results
        this.total = res.data.data.total_count
      })
    },
    // 弹窗
    pop_up () {
      this.showone = true
    },
    // 确定
    onensure () {
      this.$emit('input', this.imageUrl)
      this.showone = false
    },
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
  // .bockimg {
  //   display: -webkit-box;
  //   -webkit-line-clamp: 2;
  // }
  .coverimg {
    display: flex;
    justify-content: left;

    .cover {
      display: block;
      width: 155px;
      height: 155px;
      border: 1px dotted #ccc;
      margin-right: 100px;
    }
  }
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
  .grid-content {
    width: 100px;
    height: 104px;
    img {
      width: 100%;
    }
  }
  // position: relative;
  // .aftern {
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   background: rgba(0, 0, 0, 0.3) url('@/assets/selected.png') no-repeat 50%
  //     50px 50px;
  // }
}
</style>
