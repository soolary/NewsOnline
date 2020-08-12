<template>
  <div class="home">
    <img src="../../assets/bg.jpg" alt="" />
  </div>
</template>

<script>
import JSONbig from 'json-bigint'

export default {
  name: 'Home',
  created () {
    const str = '{"id": 1265139682652454912, "title": "csadada"}'
    console.log('JSON.parse', JSON.parse(str))
    // 对于JSONbig 它在处理数据时，会自动识别其中的 大数， 并以数组的格式保存起来
    const d = JSONbig.parse(str)
    console.log('JSONbig.parse')
    console.dir(d)
    console.log(d.id.toString())
  }
}
</script>

<style scoped lang="less">
.home {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
