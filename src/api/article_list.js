// import request from "../utils/request";
import axios from 'axios'
const baseUrl = '/node_api/articleCRUD'

// 首页文章列表
export const getArticle_list = ()=>{
    return axios({
        method:'get',
        url:`${baseUrl}/article_list`,
    })
}

// 首页侧边数据
export const getSide_list = ()=>{
  return axios ({
    methods:'get',
    url:"/node_api/side_list"
  })
}
// 搜索文章
export const serach_article = (params)=>{
  return axios({
    methods:'get',
    url:`${baseUrl}/search_article`,
    params
  })
}

// 读指定某条文章内容
export const Get_Article_Content = (article_id)=>{
  return axios ({
    method:'get',
    url:`${baseUrl}/get_article_content`,
    params:{
      article_id
    }
  })
}

// 读取某个模块文章列表
export const Get_Article_ModuleList = (module,current)=>{
  return axios ({
    method:'get',
    url:`${baseUrl}/get_article_moduleList`,
    params:{
      module,
      current
    }
  })
}

// 发布碎碎念
export const send_nagging = (data)=>{
 return axios({
  method:'put',
  url:`${baseUrl}/send_nagging`,
  data
 })
}
// 获取碎碎念
export const getNagging = ()=>{
  return axios({
    method:'get',
    url:`${baseUrl}/get_nagging`
  })
}
