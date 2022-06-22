import axios from 'axios'
export const uploadImg = (coverUrl)=>{
    return axios({
        method:'post',
        url:`/node_api/up/profile`,
        data:{
          coverUrl
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
