// import request from "../utils/request";
import axios from 'axios'
export const Login = (username,password,code)=>{
    return axios({
        method:'post',
        url:`/node_api/login`,
        data:{
          username,password,code
        }
    })
}
export const getCode = (username)=>{
  return axios({
    method:'get',
    url:'/node_api/getCode',
    params:{
      username
    }
  })
}