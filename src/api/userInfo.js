import axios from 'axios'
const baseUrl = '/node_api/userCRUD'
export const changeUserInfo = (data)=>{
       return  axios({
        method:'post',
        url:`${baseUrl}/changeuserInfo`,
        data
      })
}
export const getUser = (id)=>{
  return axios({
    method:'get',
    url:`${baseUrl}/getUser`,
    params:{id}
  })
}

export const getResume = (params)=>{
  return axios({
    method:'get',
    url:`${baseUrl}/get_resume`,
    params
  })
}
