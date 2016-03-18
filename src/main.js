import Vue from 'vue'
import Material from 'vue-mdl'
import App from './App'

import io from 'socket.io-client'

Vue.config.debug = true
Vue.use(require('vue-resource'))
Vue.use(require('vue-validator'))
Vue.use(require('vue-moment'))
Material.registerAll(Vue)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
  compiled () {
    this.socket = io('http://tickbot-server.willisite.com/')
    this.$broadcast('socketReady', this.socket)
  }
})
