<template>
  <div class="uploadingl">
    <el-dialog title="提示" :visible="showone" width="30%" center>
      <span>需要注意的是内容是默认不居中的</span>
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
      showone: false
    }
  }
}
</script>

<style lang="less">
.uploadingl {
  .el-dialog,
  .el-dialog--center {
    z-index: 20050;
  }
}
</style>
