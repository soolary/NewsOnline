import instance from '../utils/request.js'

function getImages (params) {
  return instance({
    url: '/mp/v1_0/user/images',
    method: 'get',
    params
  })
}
// 删除图片
function delImages (data) {
  const { target } = data
  return instance({
    url: `/mp/v1_0/user/images/${target}`,
    method: 'DELETE',
    data
  })
}
// 收藏图片
function colImages (data) {
  const { target } = data
  return instance({
    url: `/mp/v1_0/user/images/${target}`,
    method: 'PUT',
    data
  })
}
// 上传图片
function uplImages (data) {
  return instance({
    url: '/mp/v1_0/user/images',
    method: 'POST',
    data
  })
}

export { getImages, delImages, colImages, uplImages }
