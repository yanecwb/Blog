import axios from 'axios'
// 上传文章
export const uploadArticle = (data)=>{
    return axios({
        method:'post',
        url:`/node_api/upload_article`,
        data
    })
}
// 修改文章
export const updateArticle = (data)=>{
  return axios({
      method:'post',
      url:`/node_api/upload_article`,
      data
  })
}
