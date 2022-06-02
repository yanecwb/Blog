import axios from 'axios'
export const uploadArticle = (upload_html,userId)=>{
    return axios({
        method:'post',
        url:`/node_api/upload_article`,
        data:{
          upload_html,
          userId
        }
    })
}
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
