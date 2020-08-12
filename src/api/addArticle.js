import instance from '../utils/request.js'

function getchannels () {
  return instance({
    url: 'mp/v1_0/channels',
    method: 'get'
  })
}
export { getchannels }
