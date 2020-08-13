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

export { getImages, delImages }
