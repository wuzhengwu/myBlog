import Vuex from 'vuex'
import mutations from './mutations'

/**
 * @var {Object}
 * @desc store 定义
 * @property {Object} device - 设备属性
 * @property {String} device.isMobile - true: pc  false：h5
 * @property {String} device.browser - wechat: 微信浏览器  qq: qq浏览器
 * @property {String} device.system - ios: 苹果系统  android: 安卓系统
 * @property {String} QN_POSTFIX - 七牛云图片后缀
 * @property {String} IMGHOST - 七牛云图片host
 * @property {String} AVATAR_IMGHOST - 七牛云头像host
 * @property {String} first_load - 是否第一次加载
 * @property {String} isLogin - 是否登录
 * @property {String} token - 用户密钥
 */

let state = {
    device: {
        isMobile: false,
        browser: '',
        system: ''
    },
    QN_POSTFIX: '?imageView2/2/interlace/1/format/jpg/w/',
    IMGHOST: 'http://puiub521j.bkt.clouddn.com/',
    AVATAR_IMGHOST: 'http://puiv6ad52.bkt.clouddn.com/',
    first_load: true,
    isLogin: false,
    token: null
}

const createStore = () => {
    return new Vuex.Store({
      state: state,
      mutations
    })
}
  
export default createStore