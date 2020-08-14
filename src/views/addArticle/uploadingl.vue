<template>
  <div class="uploadingl">
    <div>
      <img
        :src="value || defaultImage"
        alt=""
        class="defaultImg"
        @click="pop_up"
      />
    </div>
    <el-dialog
      @closed="onclosed"
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
              <el-radio-button :label="0">全部</el-radio-button>
              <el-radio-button :label="1">收藏</el-radio-button>
            </el-radio-group>
            <el-row :gutter="20">
              <el-col :span="4" v-for="(item, index) in listimg" :key="item.id">
                <div
                  class="grid-content"
                  @click="onclick(index)"
                  :class="{ mask: index === current }"
                >
                  <img :src="item.url" alt="" /></div
              ></el-col>
            </el-row>
            <!-- 分页 -->
            <el-pagination
              v-if="total > 12"
              background
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :total="total"
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
              ref="upload"
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
      defaultImage,
      // 分页
      page: 1,
      total: 0,
      per_page: 12,
      listimg: [],
      showone: false,
      activeName: 'first',
      imageUrl: '',
      imageUrll: '',
      tabPosition: 0,
      current: '',
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
      allPage: 1,
      collectPage: 1
    }
  },
  created () {
    // this.getpage()
    this.getinfo()
    // if (this.itemdss !== '') {
    //   this.defaultImage = this.itemdss
    // }
    console.log(this.value)
  },
  methods: {
    // 弹窗
    pop_up (index) {
      this.showone = true
      this.cindeindex = index
    },
    // 点击图片
    onclick (index) {
      console.log(index)
      this.imageUrll = this.listimg[index].url
      this.current = index
      // this.aftern = true
    },
    handleCurrentChange (val) {
      console.log(111)
      this.page = val
      this.getinfo()
    },
    // 分页方法
    // getpage () {
    //   this.page = 1
    getinfo () {
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
    // 分页方法
    getpage () {
      // 进入到全部
      if (this.tabPosition === 0) {
        this.total = 0
        this.collectPage = this.page
        this.page = this.allPage
        // console.log('进到全部也', this.allPage)
        // console.log('进到全部也。显示收藏', this.collectPage)
        // console.log('进到全部也。显示当前页码', this.page)
        this.getinfo()
      } else {
        // 收藏
        this.total = 0
        this.allPage = this.page
        this.page = this.collectPage
        // console.log('进到收藏。显示全部', this.allPage)
        // console.log('进到收藏。显示当前页码', this.page)
        this.getinfo()
      }
    },
    // 清除
    onclosed () {
      this.imageUrl = ''
      this.current = ''
    },
    // 确定
    onensure () {
      if (this.activeName === 'first') {
        this.$emit('onensure', this.imageUrll)
        this.defaultImage = this.imageUrll
      } else {
        this.$emit('onensure', this.imageUrl)
        this.defaultImage = this.imageUrl
      }
      this.showone = false
      this.$refs.upload.clearFiles()
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 图片上传
    handleAvatarSuccess (res, file) {
      this.imageUrl = res.data.url
      console.log(res)
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
  .defaultImg {
    display: block;
    width: 115px;
    height: 115px;
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
    margin-bottom: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mask::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) url('../../assets/selected.png') no-repeat;
    background-size: 100%;
  }
}
</style>
