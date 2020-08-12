import instance from '../utils/request.js'

function getImages (params) {
  return instance({
    url: '/mp/v1_0/user/images',
    method: 'get',
    params
  })
}
export { getImages }
