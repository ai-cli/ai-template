import Fly from 'flyio/dist/npm/wx'
import qs from 'qs'
import { setStorageSync, getStorageSync, showLoading, hideLoading } from '../utils'

var fly = new Fly()
var tokenFly = new Fly()
var token = getStorageSync('token')
var loadingLock = 0 // 用于判断请求数量，如果是0 hideloading
var errTokenUrl = []
// token为空重新获取
fly.config.baseURL = 'https://test.com'
tokenFly.config.baseURL = 'https://test.com'

fly.interceptors.request.use(request => {
  loadingLock = loadingLock + 1
  if (!!loadingLock) {
    showLoading({ title: '加载中' })
    }
    if (token === '') {
      fly.lock()
      return login().then((loginRes) => {
          request.headers['token'] = loginRes
          return request
        })
        .finally(() => {
          fly.unlock()
        })
    } else {
      request.headers['token'] = getStorageSync('token')
    }
})

fly.interceptors.response.use((response) => {
    loadingLock = loadingLock -1
    console.log('loadingLock', loadingLock)
    // 如果token过期
    if (!!response.data.head.error && response.data.head.error.code === 999007) {
        errTokenUrl.push(response.request.url)
        login().then((loginRes) => {
            wx.setStorageSync('token', loginRes)
            errTokenUrl.forEach( url => {
                get(url,response.request.params)
            })
        })
    }
    if (!loadingLock) {
        console.log(loadingLock);
        hideLoading()
    }
    return response.data
    },
    (err) => {
      switch (err.status) {
        case 500:
          wx.showToast({
            title: "服务器开小差"
          });
          break;
        case 404:
          wx.showToast({
            icon: 'error',
            title: "接口异常",
            image: '/static/images/close.png',
            duration: 60000
          });
          break;
      }
    }
  )

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        console.log('loginloginloginlogin', res)
        tokenFly.get('/test/login', {
          code: res.code
        }).then(res => {
          console.log(res)
          setStorageSync('token',  res.data.body.token)
          resolve(res.data.body.token)
        })
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}
// 通用的get请求
export const get = (url, params, isLoading) => {
    if (!!isLoading) {
      wx.showLoading({ title: isLoading })
    }
    return fly.get(`${url}`, qs.stringify(params))
};

export const post = (url, params, isLoading) => {
  if (!!isLoading) {
    wx.showLoading({ title: isLoading })
  }
  return fly.post(`${url}`, qs.stringify(params))
};