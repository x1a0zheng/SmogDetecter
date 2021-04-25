
const errorCodeMap = {
  200: '请求成功',
  204: '无数据',
  400: '参数错误',
  401: '认证失败',
  402: '超过访问次数',
  403: '无权限',
  404: '数据或地区不存在',
  429: '每分钟访问次数受限',
  500: '无响应'
}

var createGetAPICall = function (url, args) {
  return new Promise((resolve, reject) => {
    var req = new XMLHttpRequest()
    if (req === null) reject(new Error('Browser does not support XMLHttpRequest!'))
    req.onload = () => {
      try {
        var res = JSON.parse(req.responseText)
        if (res.code === '200') {
          resolve(res)
        } else {
          reject(new Error('API return an error(' + res.code + '): ' + errorCodeMap[res.code]))
        }
      } catch (e) {
        reject(e)
      }
    }
    req.onerror = () => {
      reject(new Error('Fail to call API'))
    }
    var params = '?'
    for (const k in args) {
      params += k + '=' + encodeURIComponent(args[k]) + '&'
    }
    req.open('GET', url + params)
    req.setRequestHeader('Accept-Language', '*')
    req.send()
  })
}

export { createGetAPICall }
