// import request from "../utils/request";
import axios from 'axios'
// 首页文章列表
export const getArticle_list = (data)=>{
    return axios({
        method:'get',
        url:`/node_api/article_list`,
        params:{...data}
    })
}

// 首页侧边数据
export const getSide_list = ()=>{
  return axios ({
    methods:'get',
    url:"/node_api/side_list"
  })
}

// 读指定某条文章内容
export const Get_Article_Content = (article_id)=>{
  return axios ({
    method:'get',
    url:'/node_api/get_article_content',
    params:{
      article_id
    }
  })
}

// 读取某个模块文章列表
export const Get_Article_ModuleList = (module)=>{
  return axios ({
    method:'get',
    url:'/node_api/get_article_moduleList',
    params:{
      module
    }
  })
}
