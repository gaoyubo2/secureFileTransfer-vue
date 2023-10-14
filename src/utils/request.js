import axios from "axios";
import {getToken} from "./token";
import store from "../store/user";
import {Message} from "element-ui";

let request = axios.create({
  baseURL: "https://gaoyubo.cn",
  // timeout: 5000,
  // headers: {
  //   "content-type": "application/json",
  // }
});

// request拦截器
request.interceptors.request.use(
  config => {
    console.log(config)
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // console.log(config)
    return config
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
