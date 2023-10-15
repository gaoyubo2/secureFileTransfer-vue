import axios from "axios";
import {getToken} from "./token";
import store from "../store/user";
import {Message} from "element-ui";
import router from "../router";

let request = axios.create({
  baseURL: "https://gaoyubo.cn:8888",
});

// request拦截器
request.interceptors.request.use(
  config => {
    //console.log(config.url)
    //不属于注册登录
    if (config.url === "user/login"){
      return config;
    }else {
      //存在token
      if (store.state.token) {
        config.headers.token = getToken()
        return config;
      } else {
        //不存在token
        router.replace({
          path: '/login'
        })
        alert("请先登录")
        location.reload()
      }
    }
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    // debugger
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      if (res.message !== "" && res.message !== null){
        Message({
          message: res.message,
          type: 'success',
          duration: 5 * 1000
        })
      }
      return response.data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default request
