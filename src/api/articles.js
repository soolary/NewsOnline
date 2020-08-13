import instance from '../utils/request.js'
// 获取文章
function getArticle (params) {
  return instance({
    url: 'mp/v1_0/articles',
    method: 'get',
    params
  })
}
// 删除文章
function deleteArticle (data) {
  const { target } = data
  return instance({
    url: `/mp/v1_0/articles/${target}`,
    method: 'DELETE',
    data
  })
}
export { getArticle, deleteArticle }
