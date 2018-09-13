import lodash from 'lodash'

const _FORMAT = 'Y-m-d H:i:s'

class Time {
  static date (format = '', date) {
    if (lodash.isNil(format)) {
      format = _FORMAT
    }
    if (lodash.isNumber(date) && date > 0) {
      date = new Date(date)
    }
    if (!(date instanceof Date)) {
      date = new Date()
    }
    let data = {
      'Y': (date) => date.getFullYear(),
      'm': (date) => date.getMonth() + 1,
      'd': (date) => date.getDate(),
      'H': (date) => date.getHours(),
      'i': (date) => date.getMinutes(),
      's': (date) => date.getSeconds()
    }
    for (let key in data) {
      if (data.hasOwnProperty(key) && format.indexOf(key) >= 0) {
        let d = data[key](date)
        if (d < 10) {
          d = '0' + d
        }
        format = format.replace(key, d)
      }
    }
    return format
  }

  static timeStamp () {
    return Date.now()
  }

  static formatRules () {
    return {
      year: 'Y',
      month: 'm',
      date: 'd',
      hours: 'H',
      minute: 'i',
      second: 's'
    }
  }
}

export { Time }
