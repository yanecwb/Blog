// import request from "../utils/request";
import axios from 'axios'
export const Login = (username,password)=>{
    return axios({
        method:'post',
        url:`/node_api/login`,
        data:{
          username,password
        }
    })
}