// import axios from 'axios'
// axios.defaults.baseURL = location.origin
// // console.log(location)
// // http响应拦截器
// axios.interceptors.response.use(
//   data => {
//     if (data.data.status === 401) {
//       // 暂无权限
//       // window.location.reload()
//       window.location.href = '/api/tasks'
//     }
//     return data
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// export default axios

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

axios.defaults.baseURL = location.origin
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  } else {
    return {
      data: {
        code: -404,
        msg: response.statusText,
        data: response.statusText
      }
    }
  }
}

function checkCode (res) {
  if (res.status !== 200 || (res.data.code) !== 200) {
    Message({
      showClose: true,
      message: res.data.msg,
      type: 'error',
      duration: 2000
    })
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(checkStatus).then(checkCode)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(checkStatus).then(checkCode)
  }
}
