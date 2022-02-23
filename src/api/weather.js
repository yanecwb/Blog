// import request from "../utils/request";
import axios from 'axios'
export const getWeather = ()=>{
    return axios({
        method:'get',
        url:`/weather_api`,
        params:{
            cityid:101280601,
            unescape:1,
            version:'v1',
            appid:62932142,
            appsecret:'BbbqB5wd'
        }
    })
}