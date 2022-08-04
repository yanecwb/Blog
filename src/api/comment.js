import axios from 'axios'
const baseUrl = '/node_api/articleCRUD'
// 发表评论
export const putComment = (data)=>{
    return axios({
        method:'put',
        url:`${baseUrl}/put_comment`,
        data
    })
}
// 获取最新评论
export const getComment = (params)=>{
    return axios({
        method:'get',
        url:`${baseUrl}/get_comment`,
        params
    })
}
//删除评论（自己的评论）
export const deleteComment = (data)=>{
  return axios({
      method:'delete',
      url:`${baseUrl}/delete_comment`,
      data
  })
}
// 文章点赞点踩
export const changeLike = (data)=>{
  return axios({
    method:'post',
    url:`${baseUrl}/change_like`,
    data
  })
}

// 收藏
export const changeCollection = (data)=>{
  return axios({
    method:'post',
    url:`${baseUrl}/change_collection`,
    data
  })
}

// 查询是否点赞点踩，收藏
export const getLike = (params)=>{
  return axios({
    methods:'get',
    url:`${baseUrl}/get_like`,
    params
  })
}

//
export const releaseReply = (data)=>{
  return axios({
    method:'post',
    url:`${baseUrl}/releaseReply`,
    data
  })
}

