import axios from 'axios'
export const uploadImg = (coverUrl,userId,type)=>{
    return axios({
        method:'post',
        url:`/node_api/up/profile`,
        data:{
          userId,
          coverUrl,
          type
        }
    })
}
export const deleteImg = (imgarr)=>{
  return axios({
      method:'post',
      url:`/node_api/up/delete`,
      data:{
        imgarr
      }
  })
}
