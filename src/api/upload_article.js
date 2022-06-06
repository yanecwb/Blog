import axios from 'axios'
// 上传文章
export const uploadArticle = (upload_html,module,userId)=>{
    return axios({
        method:'post',
        url:`/node_api/upload_article`,
        data:{
          upload_html,
          module,
          userId
        }
    })
}
// 修改文章
export const updateArticle = (upload_html,userId,article_id)=>{
  return axios({
      method:'post',
      url:`/node_api/upload_article`,
      data:{
        upload_html,
        userId,
        article_id
      }
  })
}
