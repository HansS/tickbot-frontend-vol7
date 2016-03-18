import Vue from 'vue'
import Material from 'vue-mdl'
import App from './App'

import io from 'socket.io-client'
const socket = io('http://tickbot-server.willisite.com/')

Vue.config.debug = true
Vue.use(require('vue-resource'))
Vue.use(require('vue-validator'))
Vue.use(require('vue-moment'))
Material.registerAll(Vue)

/* eslint-disable no-new */
const vm = new Vue({
  el: 'body',
  components: { App },
  compiled () {
    this.socket = io('http://tickbot-server.willisite.com/')
    this.$broadcast('socketReady', this.socket)
  }
})

socket.on('post', res => vm.$children[0].$children[1].entries.push(res.entry))

socket.on('put', res => {
  const element = vm.entries.find(entry => entry._id === res.id)
  vm.entries.$set(element, res.message)
})

socket.on('delete', id => {
  const element = vm.$children[0].$children[1].entries.find(entry => entry._id === id)
  vm.$children[0].$children[1].entries.$remove(element)
})
