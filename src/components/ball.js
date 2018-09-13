import firstDemoComponet from './ball'

const firstdemo = {
  install: function (Vue) {
    Vue.component('first-demo', firstDemoComponet)
  }
}

export default firstdemo
