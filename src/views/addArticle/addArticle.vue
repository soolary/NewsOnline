<template>
  <div class="addArticle">
    <el-card>
      <!-- 抬头 -->
      <Breadcrumb></Breadcrumb>
      <h3 class="toph3"></h3>
      <el-form
        :rules="rules"
        label-width="100px"
        ref="form"
        :model="form"
        class="form"
      >
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!-- 父文本框 -->
        <el-form-item prop="content" label="内容">
          <quillEditor :options="editorOption" v-model="form.content">
          </quillEditor>
        </el-form-item>

        <!-- 封面 -->
        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type" @change="onchange">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          class="upllIMg"
          prop="cover"
          v-if="form.cover.type !== -1"
        >
          <!-- <div class="div" v-if="form.cover.type === 1">
            <uploadingl v-model="form.cover.images[0]"></uploadingl>
          </div> -->

          <div v-for="(item, index) in form.cover.type" :key="index">
            <uploadingl
              ref="uploadingl"
              @onensure="onensure($event, index)"
              v-model="form.cover.images[index]"
            ></uploadingl>
          </div>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="form.channel_id" placeholder="请选择频道">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in channelist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="$route.params.id">
          <el-button type="primary" @click="onredact">保存</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="onissue(false)">发表</el-button>
          <el-button @click="onissue(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入接口
import {
  getchannels,
  getarticles,
  getarticlestarget,
  getarticlestatistics
} from '../../api/addArticle.js'
// 导入弹框
import uploadingl from './uploadingl.vue'
// 导入富文本框
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import defaultImage from '@/assets/default.png'
export default {
  name: 'addArticle',
  components: {
    quillEditor,
    uploadingl
  },
  // 侦听器
  watch: {
    // 'form.cover': {
    //   handler () {
    //     this.$nextTick(() => {
    //       this.$refs.form.validateField('cover')
    //     })
    //   },
    //   deep: true
    // },
    '$route.path' () {
      this.form = {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      }
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  },
  data () {
    const checkAge = (rule, value, callback) => {
      console.log(rule)
      console.log(value)
      if (value.type === 1) {
        if (!value.images[0]) {
          this.$message.error('请上传图片')
          return
        }
      }
      if (value.type === 3) {
        if (!value.images[0] || !value.images[1] || !value.images[2]) {
          this.$message.error('请上传图片')
          return
        }
      }

      callback()
    }
    return {
      // 频道
      defaultImage,
      cindeindex: 0,
      channelist: [],
      imgCopy: [],
      form: {
        title: '',
        content: '',
        channel_id: '',
        cover: {
          type: 0,
          images: []
        }
      },
      // 表单校验
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '标题长度在 6 到 12个字符',
            trigger: 'change'
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ],
        content: [{ required: true, message: '请输入内容', trigger: 'change' }],
        cover: [{ validator: checkAge, trigger: 'blur' }]
      },
      // 富文本框自定义
      editorOption: {
        placeholder: '请在这里输入........',
        modules: {
          toolbar: [
            ['bold', 'italic', 'blockquote', 'code'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  created () {
    getchannels().then(res => {
      console.log('--------------------------')
      console.log('补充', res)
      this.channelist = res.data.data.channels
    })
    if (this.$route.params.id) {
      this.getchonse()
    }
  },

  methods: {
    onchange () {
      if (this.form.cover.type === 1) {
        this.imgCopy = JSON.parse(JSON.stringify(this.form.cover.images))
        this.form.cover.images = this.form.cover.images.slice(0, 1)
      }
      if (this.form.cover.type === 3) {
        this.form.cover.images = this.imgCopy
      }
    },

    // 图片传值
    onensure (img, index) {
      console.log(img)
      this.$set(this.form.cover.images, index, img)
      // this.form.cover.images[index] = img
    },
    // 获取编辑文章
    getchonse () {
      const id = this.$route.params.id.split(':')[0]
      console.log(id)
      getarticlestatistics(id).then(res => {
        console.log('获取编辑数据', res)
        this.form = res.data.data
        // this.$refs.uploadingl.defaultImage = res.data.data.cover.images
      })
    },

    // 编辑文章
    onredact () {
      this.$refs.form.validate(resues => {
        if (resues) {
          this.form.draft = true
          this.form.cover.type = Number(this.form.cover.type)
          const id = this.$route.params.id.split(':')[0]
          getarticlestarget(this.form, id).then(res => {
            console.log(res)
            this.$refs.form.resetFields()
            if (res.status === 201) {
              this.$router.go(-1)
              this.$message.success('保存成功')
              this.form = {
                title: '',
                content: '',
                channel_id: '',
                cover: {
                  type: '',
                  images: []
                }
              }
              this.$set(this.form.cover, 'images', [])
              this.$set(this, 'imgCopy', [])
            }
          })
        } else {
          this.$message.error('请输入内容')
        }
      })
    },

    // 发表存草稿
    onissue (draft) {
      this.$refs.form.validate(resues => {
        if (resues) {
          // this.form.draft = draft
          this.form.cover.type = Number(this.form.cover.type)
          getarticles(this.form, `draft=${draft}`).then(res => {
            console.log('发表', res)
            if (res.status === 201) {
              this.$refs.form.resetFields()
              if (draft === true) {
                this.$message.success('已存草稿')
              } else {
                this.$message.success('发表成功')
              }
              this.$refs.uploadingl.defaultImage = this.defaultImage
              this.form = {
                title: '',
                content: '',
                channel_id: '',
                cover: {
                  type: '',
                  images: []
                }
              }
              this.$set(this.form.cover, 'images', [])
              this.$set(this, 'imgCopy', [])
            }
          })
        } else {
          this.$message.error('请输入内容')
        }
      })
    }
  }
}
</script>

<style lang="less">
.addArticle {
  .el-card__body {
    position: relative;
    .toph3 {
      position: absolute;
      height: 1px;
      left: 0;
      right: 0;
      margin: 20px 0;
      background-color: #ebeef5;
    }
    .form {
      .upllIMg /deep/ .el-form-item__content {
        display: flex;
        > div {
          margin-right: 20px;
        }
      }
      margin-top: 40px;
      .ql-editor,
      .ql-blank {
        height: 300px;
      }
      .cover-image {
        margin-top: 20px;
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
    }
  }
}
</style>
