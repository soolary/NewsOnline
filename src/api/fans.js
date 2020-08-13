import instance from '../utils/request.js'

function getFans (params) {
  return instance({
    url: '/mp/v1_0/followers',
    method: 'get',
    params
  })
}
function fansStatistics () {
  return instance({
    url: '/mp/v1_0/statistics/followers',
    method: 'get'
  })
}
export { getFans, fansStatistics }
