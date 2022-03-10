// import request from "../utils/request";
import axios from 'axios'
export const getArticle_list = ()=>{
    return axios({
        method:'get',
        url:`/node_api/article_list`,
    })
}

export const getSide_list = ()=>{
  return axios ({
    methods:'get',
    url:"/node_api/side_list"
  })
}