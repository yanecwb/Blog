import axios from 'axios'
export const changeUserInfo = (data)=>{
       return  axios({
        method:'post',
        url:`/node_api/changeuserInfo`,
        data
      })
}
