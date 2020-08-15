<template>
  <div class="setting">
    <el-card>
      <div class="title" slot="header">
        <Breadcrumb></Breadcrumb>
      </div>
      <div class="content">
        <el-row>
          <el-col :span="12">
            <el-form
              :model="userInfo"
              :rules="rules"
              ref="userInfo"
              label-width="100px"
              class="userInfo"
            >
              <el-form-item label="编号: ">
                {{ userInfo.id }}
              </el-form-item>
              <el-form-item label="手机: ">
                {{ userInfo.mobile }}
              </el-form-item>
              <el-form-item
                label="媒体名称: "
                prop="name"
                placeholder="最多7个字符"
              >
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍: ">
                <el-input type="textarea" v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="联系邮箱: " prop="email">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('userInfo')"
                  >保存设置</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              action=""
              :before-upload="beforeAvatarUpload"
              :http-request="uploadFile"
              :show-file-list="false"
            >
              <img
                class="avatar"
                v-if="userInfo.photo"
                :src="userInfo.photo"
                alt=""
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p>修改头像</p>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { setUser, getUser } from '@/utils/storage.js'
export default {
  name: 'setting',
  data () {
    return {
      userInfo: {
        id: '',
        mobile: '',
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      rules: {
        name: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 7, message: '最多 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '邮箱格式有误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.save()
        } else {
          this.$message.error('请检查提交内容')
        }
      })
    },
    async save () {
      try {
        const { name, intro, email } = this.userInfo
        await this.$request.patch('mp/v1_0/user/profile', {
          name,
          intro,
          email
        })
        this.$message.success('保存设置成功')
        // 同步到本地并存入
        this.$eventBus.$emit('updateUserName', this.userInfo.name)
        const user = getUser()
        user.name = this.userInfo.name
        setUser(user)
      } catch (e) {
        console.log(e)
      }
    },
    beforeAvatarUpload (file) {
      const isRight = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isRight) {
        this.$message.error('上传头像图片只能是 jpeg/png 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isRight && isLt5M
    },

    async uploadFile ({ file }) {
      try {
        const formdata = new FormData()
        formdata.append('photo', file)
        // 上传头像接口
        const res = await this.$request.patch('mp/v1_0/user/photo', formdata)
        console.log(res)
        this.$message.success('修改头像成功')
        // 同步到本地并存入
        this.userInfo.photo = res.data.data.photo
        // 同时更新到layout和本地
        this.$eventBus.$emit('updateUserPhoto', this.userInfo.photo)
        const user = getUser()
        user.photo = this.userInfo.photo
        setUser(user)
      } catch (e) {
        console.log(e)
        this.$message.error('修改头像失败')
      }
    },
    async getUserInfo () {
      const res = await this.$request.get('mp/v1_0/user/profile')
      console.log(res)
      this.userInfo = res.data.data
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>
<style lang="less">
.setting {
  .content {
    padding: 20px;
    .avatar-uploader,
    p {
      text-align: center;
    }
  }
}
</style>
