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
