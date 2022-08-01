import axios from 'axios'
export const getIsChat = (chatId)=>{
  return axios({
    method:'get',
    url:`/node_api/socketCRUD/is_chated`,
    params:{chatId}
  })
}
