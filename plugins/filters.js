import Vue from 'vue'

/**
 * 日期格式化
 * @param timeSpan  时间戳
 * @param format    时间格式
 * @returns {format}
 */
export function dateFormat(timeSpan, format) {
    if (!timeSpan) return
  
    timeSpan = timeSpan.toString().length === 10 ? timeSpan * 1000 : timeSpan
  
    let date = new Date(timeSpan)
    let o = {
      'M+': date.getMonth() + 1, //月
      'D+': date.getDate(), //天
      W: '日一二三四五六'.charAt(date.getDay()), //星期
      'h+': date.getHours(), //时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季节
      S: date.getMilliseconds() //毫秒
    }
    if (/(Y+)/.test(format))
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
  
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
  
    return format
  }


  let filters = {
    dateFormat
  }
  
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })