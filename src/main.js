import Vue from 'vue'
import App from './App'
import io from 'socket.io-client'

Vue.config.debug = true
Vue.use(require('vue-resource'))
Vue.use(require('vue-validator'))
Vue.use(require('vue-moment'))

Vue.mixin({
  init () {
    this.$socket = io('http://tickbot-server.willisite.com/')
  }
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
