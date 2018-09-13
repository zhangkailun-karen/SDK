import $ from 'jquery'
function ball () {
  var oDiv = $('#ball')
  var dDiv = document.getElementById('ball')
  var _x_start, _y_start, _x_move, _y_move, _x_end, _y_end, left_start, top_start, tm
  function time (w, time) {
    clearInterval(tm)
    tm = setTimeout(() => {
      oDiv.css('left', w + 'px')
      oDiv.css('opacity', '0.5')
    }, time)
  }

  // 按下
  dDiv.addEventListener('touchstart', function (e) {
    clearInterval(tm)

    dDiv.style.transition = 'none'
    dDiv.style['transition'] = 'none'
    dDiv.style.opacity = '1'
    oDiv.css('opacity', '1')
    _x_start = e.touches[0].pageX// 起始点击位置
    _y_start = e.touches[0].pageY// 起始点击位置
    left_start = oDiv.css('left')// 元素左边距
    top_start = oDiv.css('top')// 元素上边距
  })
  // 移动
  dDiv.addEventListener('touchmove', function (e) {
    clearInterval(tm)
    e.preventDefault()// 取消事件的默认动作。
    _x_move = e.touches[0].pageX// 当前屏幕上所有触摸点的集合列表
    _y_move = e.touches[0].pageY// 当前屏幕上所有触摸点的集合列表
    // 左边距=当前触摸点-鼠标起始点击位置+起始左边距
    oDiv.css('left', parseFloat(_x_move) - parseFloat(_x_start) + parseFloat(left_start) + 'px')
    // 上边距=当前触摸点-鼠标起始点击位置+起始上边距
    oDiv.css('top', parseFloat(_y_move) - parseFloat(_y_start) + parseFloat(top_start) + 'px')
  })
  // 松开
  dDiv.addEventListener('touchend', function (e) {
    clearInterval(tm)
    dDiv.style.transition = 'all .2s'
    dDiv.style['transition'] = 'all .2s'
    var bodyW = $(window).width() / 2// 屏幕宽的一半
    var bodyH = $(window).height()// 屏幕高
    var _x_end = e.changedTouches[0].pageX// 松开位置
    var _y_end = e.changedTouches[0].pageY// 松开位置
    var divH = oDiv.height()// 元素高
    var divW = oDiv.width()// 元素宽

    // 当最终位置在屏幕左半部分
    if (_x_end < bodyW) {
      oDiv.css('left', '0px')
      time(-parseFloat(divW) / 2, 2500)
    } else if (_x_end >= bodyW) { // 当最终位置在屏幕右半部分
      oDiv.css('left', $(window).width() - parseFloat(divW))
      time($(window).width() - parseFloat(divW) / 2, 2500)
      // setTimeout(() => {
      //   oDiv.css('left', $(window).width() - parseFloat(divW) / 2 + 'px')
      //   oDiv.css('opacity', '0.5')
      // }, 2500)
    }

    // 当元素顶部在屏幕外时
    if (parseFloat(oDiv.css('top')) < 0) {
      // 置于顶部
      oDiv.css('top', 0)// 置于顶部
    }
    // 当元素底部在屏幕外时
    if (bodyH - _y_end < parseFloat(divH) / 2) {
      // 置于底部
      oDiv.css('top', bodyH - parseFloat(divH))
    }
  })
}
export {
  ball
}
