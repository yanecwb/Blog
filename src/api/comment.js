import axios from 'axios'
// 发表评论
export const putComment = (data)=>{
    return axios({
        method:'put',
        url:`/node_api/put_comment`,
        data
    })
}
// 获取最新评论
export const getComment = (params)=>{
    return axios({
        method:'get',
        url:'/node_api/get_comment',
        params
    })
}
//删除评论（自己的评论）
export const deleteComment = (data)=>{
  return axios({
      method:'delete',
      url:'/node_api/delete_comment',
      data
  })
}

