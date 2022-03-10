import axios from 'axios'
export const Register = (username,password)=>{
    return axios({
        method:'post',
        url:`/node_api/register`,
        data:{
          username,
          password
        }
    })
}