import axios from 'axios'
export const uploadImg = (img)=>{
    return axios({
        method:'post',
        url:`/node_api/upload_img`,
        data:{
          img
        }
    })
}
