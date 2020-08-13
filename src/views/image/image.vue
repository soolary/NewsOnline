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
          @change="toggleList()"
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
        <div class="item-box" v-for="(item, index) in list" :key="index">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              @click="clo(item)"
              class="el-icon-star-off"
              :class="{ red: item.is_collected }"
            ></span>
            <span @click="del(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
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
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
    </el-dialog>
    <!-- <div class="option" v-if="!reqParams.collect">
      <span class="el-icon-star-off" :class="{ red: item.is_collected }"></span>
      <span class="el-icon-delete"></span>
    </div> -->
  </div>
</template>

<script>
import { getImages, delImages } from '../../api/image.js'
export default {
  created () {
    this.getdata()
  },
  data () {
    return {
      // 素材列表
      list: [],
      //   总条数
      total: 0,
      dialogTableVisible: false,
      dialogFormVisible: false,
      //   查询条件
      reqParams: {
        //   是否查的收藏 true查询收藏  false查询全部
        collect: false,
        page: 1,
        per_page: 10
      }
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
        per_page: this.reqParams.per_page
      }
      getImages(query).then(res => {
        //   window.console.log(res)
        this.list = res.data.data.results
        //   设置总条数
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
</style>
