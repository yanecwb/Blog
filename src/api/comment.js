import axios from 'axios'
// 发表评论
export const putComment = (data)=>{
    return axios({
        method:'put',
        url:`/node_api/articleCRUD/put_comment`,
        data
    })
}
// 获取最新评论
export const getComment = (params)=>{
    return axios({
        method:'get',
        url:'/node_api/articleCRUD/get_comment',
        params
    })
}
//删除评论（自己的评论）
export const deleteComment = (data)=>{
  return axios({
      method:'delete',
      url:'/node_api/articleCRUD/delete_comment',
      data
  })
}
// 文章点赞点踩
export const changeLike = (data)=>{
  return axios({
    method:'post',
    url:'/node_api/articleCRUD/change_like',
    data
  })
}

// 收藏
export const changeCollection = (data)=>{
  return axios({
    method:'post',
    url:'/node_api/articleCRUD/change_collection',
    data
  })
}

// 查询是否点赞点踩，收藏
export const getLike = (params)=>{
  return axios({
    methods:'get',
    url:'/node_api/articleCRUD/get_like',
    params
  })
}

//
export const releaseReply = (data)=>{
  return axios({
    method:'post',
    url:'/node_api/articleCRUD/releaseReply',
    data
  })
}

