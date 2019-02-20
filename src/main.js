// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'normalize.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import '@/assets/css/basic.css'
import { getThousandNum } from '@/assets/utils/index'
// 引入字体
import '@/assets/font/iconfont.css'
import './icons' // icon

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.$getThousandNum = getThousandNum
Vue.filter('getThousandNum', getThousandNum)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
