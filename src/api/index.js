//api进行统一管理
import requests from "../utils/request";
//登录
export const reqUserLogin = (data)=>requests({url:'user/login',data,method:'post'});

//文件初始化
export const reqFileStart = (data)=>requests({url:'/file/start',data,method:'post'});

//分块上传文件
export const reqUploadFilePart = (data)=>requests({url:`/file/upload/`,data,method:'post'});

//合并文件
export const reqMerge = (data)=>requests({url: "file/merge",data,method:'post'})
//获取文件列表
export const reqGetDirectories = (data)=>requests({url: `directory/directories?directoryName=${data.directoryName}`,data,method:'get'})
