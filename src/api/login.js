// import request from "../utils/request";
import axios from 'axios'
export const Login = (phone,password)=>{
    return axios({
        method:'get',
        url:`/api/login/cellphone`,
        params:{
          phone,password
        }
    })
}