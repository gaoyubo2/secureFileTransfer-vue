// import {getToken, removeToken, setToken} from "@/utils/token";
import {getToken, setToken} from "../utils/token";
import {reqDownload, reqFileStart, reqGetDirectories, reqMerge, reqUploadFilePart, reqUserLogin} from "../api";

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
  //登录业务
  async userLogin({commit}, data) {
    let result = await reqUserLogin(data)
    let token = result.data.session.sessionToken
    //服务器下发token，将来经常通过token找服务器要用户信息进行展示
    commit("USER_LOGIN", token)
    //持久化存储token
    setToken(token)
    return result.data
  },
  //初始化文件
  async fileStart({commit},data){
    let result = await reqFileStart(data)
    // console.log(result)
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
  },
  //下载文件
  async downloadFile({commit},data){
    let result = await reqDownload(data)
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

