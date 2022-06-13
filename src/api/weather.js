import axios from 'axios'
export const weather_json = {
  '晴':' icon-taiyang',
  '雨':' icon-yu',
  '雪':' icon-xue',
  '雾霾':' icon-wu',
  '月':' icon-yueliang',
}
export const getWeather = ()=>{
    return axios({
        method:'get',
        url:`https://www.tianqiapi.com/api`,
        params:{
            cityid:101280501,
            unescape:1,
            version:'v1',
            appid:62932142,
            appsecret:'BbbqB5wd'
        }
    })
}
