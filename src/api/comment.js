import axios from '../utils/request'
import { getUser } from '../utils/storage'
// 获取评论列表
export const commentList = params => {
  return axios({
    method: 'get',
    url: '/mp/v1_0/articles',
    params,
    headers: {
      ContentType: 'application/json',
      Authorization: `Bearer ${getUser()}`
    }
  })
}
// 修改评论状态
export const setStatus = data => {
  const { article_id, allow_comment } = data
  return axios({
    method: 'put',
    url: `/mp/v1_0/comments/status?article_id=${article_id.toString()}`,
    data: {
      allow_comment
    }
    // headers: {
    //   ContentType: 'application/json',
    //   Authorization: `Bearer ${getUser()}`
    // }
  })
}
