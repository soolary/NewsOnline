import instance from '../utils/request.js'

// 频道
function getchannels () {
  return instance({
    url: 'mp/v1_0/channels',
    method: 'get'
  })
}
// 发表文章
function getarticles (data) {
  return instance({
    url: 'mp/v1_0/articles',
    method: 'post',
    data
  })
}

export { getchannels, getarticles }
