// import {getToken, removeToken, setToken} from "@/utils/token";
import {getToken, setToken} from "../utils/token";
import {reqFileStart, reqGetDirectories, reqMerge, reqUploadFilePart, reqUserLogin} from "../api";

const state = {
  code: "",
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GET_CODE(state, code) {
    state.code = code
  },
  USER_LOGIN(state, token) {
    state.token = token
  }
}
const actions = {

  /*//登录业务
  async userLogin({commit}, data) {
    let result = await reqUserLogin(data)
    //服务器下发token，将来经常通过token找服务器要用户信息进行展示
    if (result.code === 20000) {
      commit("USERLOGIN", result.data.token)
      //持久化存储token
      setToken(result.data.token)
      //用户已经登陆成功且获取到token
      let userInfo = reqUserInfo()
      setUserInfo(userInfo)
      return 'ok'

    } else {
      alert(result.message)
      return Promise.reject(new Error(result.message))
    }
  },*/

  //登录业务
  async userLogin({commit}, data) {
    let result = await reqUserLogin(data)
    //服务器下发token，将来经常通过token找服务器要用户信息进行展示
    commit("USER_LOGIN", result.data.token)
    //持久化存储token
    setToken(result.data.token)
    //用户已经登陆成功且获取到token
    // let userInfo = reqUserInfo()
    // setUserInfo(userInfo)
    return 'ok'
  },
  //初始化文件
  async fileStart({commit},data){
    let result = await reqFileStart(data)
    // console.log(result)
    return result.data
  },
  //分块上传文件
  async uploadFilePart({commit},data){
    let result = await reqUploadFilePart(data)
    return result.data
  },
  //合并文件
  async merge({commit},data){
    let result = await reqMerge(data)
    return result.data
  },
  //获取文件列表
  async getDirectories({commit},data){
    let result = await reqGetDirectories(data)
    return result.data
  }
}

const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}

