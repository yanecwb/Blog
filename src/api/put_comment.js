import axios from 'axios'
// 上传文章
export const putComment = (data)=>{
    return axios({
        method:'put',
        url:`/node_api/put_comment`,
        data
    })
}
