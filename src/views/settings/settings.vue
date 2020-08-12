<template>
  <div class="setting">
    <el-card>
      <div class="title">
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
              <el-form-item label="编号">
                <el-input v-model="userInfo.id"></el-input>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="userInfo.mobile"></el-input>
              </el-form-item>
              <el-form-item
                label="媒体名称"
                prop="name"
                placeholder="最多7个字符"
              >
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('userInfo')"
                  >立即创建</el-button
                >
                <el-button @click="resetForm('userInfo')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadFile"
              :show-file-list="false"
            >
              <img
                class="avatar"
                v-if="userInfo.photo"
                :src="user.photo"
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
          { required: false, message: '请输入正确邮箱格式', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    async uploadFile ({ file }) {
      try {
        const formdata = new FormData()
        formdata.append('photo', file)
        // 上传头像接口
        const res = await this.$request.patch('/user/photo', formdata)
        this.$message.success('修改头像成功')
        // 同步到本地
        console.log(res)
        this.userInfo.photo = res.data.data.photo
      } catch (e) {
        console.log(e)
        this.$message.error('修改头像失败')
      }
    }
  }
}
</script>
<style lang="less">
.setting {
  .title {
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
  }
  .content {
    padding: 20px;
    .avatar-uploader,
    p {
      text-align: center;
    }
  }
}
</style>
