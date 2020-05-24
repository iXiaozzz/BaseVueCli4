/* eslint-disable */
import axios from 'axios'
// import storage from '@/script/storage'
// import utils from '@/lib/utils'

axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
    // 1. 这个位置就请求前最后的配置
    // 2. 当然你也可以在这个位置 加入你的后端需要的用户授权信息
    // const authToken = storage.getItem('authToken')
    // authToken && (config.headers['authtoken'] = authToken)
    // config.headers['content-Type'] = 'text/aihua+;charset=utf-8'
    // if (config.url.includes('/uploadFile')) return config // 上传文件
    // getPhoneNameAndSystemName()
    // let timeStamp = Date.now()
    // let sign = md5(`${timeStamp}${key.key}`).toUpperCase()
    // // 发送时间
    // let sendTime = new Date().getTime()
    // // 批次调用唯一标识
    // let transferId = uuid()
    // // 在当次调用本次调用的顺序
    // let transferSeq = '1'
    // // 当次调用的地址
    // let uri = `${document.URL}`
    // // 当次调用的备注
    // let title = document.title
    // let frontTrace = JSON.stringify({ sendTime, transferId, transferSeq, uri, title, phoneModel, phoneSys })
    // config.data['sign'] = sign
    // config.data['timeStamp'] = timeStamp
    // let data = {
    //   header: { appType: '2', frontTrace: frontTrace },
    //   body: config.data || {}
    // }
    // data = Base64.encode(JSON.stringify(data))
    // config.data = data
    // config.header = {
    //     'platform': 'pc',
    //     'requestAim': 'pcShop',
    //     'Authorization': utils.getCookie('Authorization') || '',
    //     'clientKey': utils.getCookie('clientKey') || '',
    //     'openid': utils.getCookie('openid') || '',
    //     'path': '/' + window.location.hash || ''
    // }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    // 请求成功
    // 1. 根据自己项目需求定制自己的拦截
    // 2. 然后返回数据

    return response
}, error => {
    // 请求失败
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                // 对400错误您的处理\
                break
            case 401:
                // 对 401 错误进行处理
                break
            default:
                // 如果以上都不是的处理
                return Promise.reject(error)
        }
    }
})

function getPhoneNameAndSystemName() {
    // 测试获取手机型号和手机系统
    var device_type = navigator.userAgent// 获取userAgent信息
    var md = new MobileDetect(device_type)// 实例化mobile-detect
    var os = md.os()// 获取系统
    var model = ''
    if (os === 'iOS') { // ios系统的处理
        os = md.os() + md.version('iPhone')
        model = md.mobile()
    } else if (os === 'AndroidOS') { // Android系统的处理
        os = md.os() + md.version('Android')
        model = md.mobile()
    }
    phoneModel = model
    phoneSys = window.navigator.userAgent
    // 打印系统版本和手机型号
    console.log(phoneModel + '---' + window.navigator.userAgent)
}
