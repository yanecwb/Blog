// import request from "../utils/request";
import axios from 'axios'
// 首页文章列表
export const getArticle_list = ()=>{
    return axios({
        method:'get',
        url:`/node_api/articleCRUD/article_list`,
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
    url:'/node_api/articleCRUD/search_article',
    params
  })
}

// 读指定某条文章内容
export const Get_Article_Content = (article_id)=>{
  return axios ({
    method:'get',
    url:'/node_api/articleCRUD/get_article_content',
    params:{
      article_id
    }
  })
}

// 读取某个模块文章列表
export const Get_Article_ModuleList = (module,current)=>{
  return axios ({
    method:'get',
    url:'/node_api/articleCRUD/get_article_moduleList',
    params:{
      module,
      current
    }
  })
}
