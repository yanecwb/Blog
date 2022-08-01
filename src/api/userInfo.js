import axios from 'axios'
export const changeUserInfo = (data)=>{
       return  axios({
        method:'post',
        url:`/node_api/userCRUD/changeuserInfo`,
        data
      })
}
export const getUser = (id)=>{
  return axios({
    method:'get',
    url:`/node_api/userCRUD/getUser`,
    params:{id}
  })
}
