const mutations = {
    /**
     * 初始化参数
     * @param {Object} data - 设备信息
     */
    init(state, data) {
      Object.assign(state, data)
    },
    loadChange(state) {
      state.first_load = false
    },
    goLogin(state) {
      state.isLogin = true
    },
    signOutLogin(state) {
      state.isLogin = false
    },
    checkLogin(state, data) {
      state.token = data
    },
    notLogin(state) {
      state.token = null
    }
}
  
export default mutations