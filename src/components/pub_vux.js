import { AlertPlugin, ToastPlugin, Toast, XButton, XHeader, Group, CellBox, XSwitch, Tabbar, TabbarItem, LoadMore, Alert } from 'vux'
export default (Vue) => {
  Vue.component('cell-box', CellBox)
  Vue.component('alert', Alert)
  Vue.component('x-switch', XSwitch)
  Vue.component('tabbar', Tabbar)
  Vue.component('tabbar-item', TabbarItem)
  Vue.component('toast', Toast)
  Vue.component('x-button', XButton)
  Vue.component('x-header', XHeader)
  Vue.component('group', Group)
  Vue.component('load-more', LoadMore)
  Vue.use(AlertPlugin)
  Vue.use(ToastPlugin)
}
