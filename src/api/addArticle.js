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
// 编辑文章
function getarticlestarget (data, target) {
  return instance({
    url: `mp/v1_0/articles/${target}`,
    method: 'put',
    data
  })
}
// 编辑文章
function getarticlestatistics (article_id) {
  return instance({
    url: `mp/v1_0/articles/${article_id}`,
    method: 'get'
  })
}
// 获取用户图片素材
function getuserimages (params) {
  return instance({
    url: 'mp/v1_0/user/images',
    method: 'get',
    params
  })
}

export {
  getchannels,
  getarticles,
  getarticlestarget,
  getarticlestatistics,
  getuserimages
}
