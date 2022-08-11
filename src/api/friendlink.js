import axios from 'axios'
const baseUrl = '/node_api/FriendLinkCRUD'
// 发表评论
export const putCommentFriendLink = (data)=>{
    return axios({
        method:'put',
        url:`${baseUrl}/put_commentFriendLink`,
        data
    })
}


// 获取最新评论
export const getCommentFriendLink = (params)=>{
    return axios({
        method:'get',
        url:`${baseUrl}/get_commentFriendLink`,
        params
    })
}


//回复
export const putReplyCommentFriendLink = (data)=>{
  return axios({
    method:'put',
    url:`${baseUrl}/put_replyCommentFriendLink`,
    data
  })
}

// 获取友链
export const getFriendLink = ()=>{
  return axios({
    method:'get',
    url:`${baseUrl}/get_friendLink`,
  })
}
