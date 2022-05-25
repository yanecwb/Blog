import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 3000,//超过时间还未得到数据就会超时，报错，尽量不要设置太短时间
    headers: {
        //公共的请求头参数（q）
    }
})

// 请求拦截器
request.interceptors.request.use(
    // 默认情况下：只会触发成功的回调
    (config) => {
        console.log(config);
        return config
    },
    // 请求失败的回调
    (err) => {
        return Promise.reject(err)
    }
)

// 响应拦截器
request.interceptors.response.use(
    // 响应成功回调：请求成功：响应状态码2xx
    (response) => {
        // 请求响应成功不代表功能成功
        // 成功就是功能成功，失败就是请求失败、功能失败
        if (response.data.code === 200) {
            return response.data.data
        }
        return Promise.reject(response.data.message)
    },
    //响应失败回调：请求失败:响应状态码非 2xx
    (err) => {
        // 提示错误
        console.log(err.message);
        return Promise.reject()
    }
)

// 导出
export default request
