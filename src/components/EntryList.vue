<template>
  <div class="row" v-show="entries.length">
    <ul class="collapsible" data-collapsible="expandable">
      <li v-for="entry in entries" track-by="_id">
        <div class="collapsible-header">
          <img :src="entry.avatar" alt="" class="circle">
          {{ entry.name }} - {{ entry.project }}
        </div>
        <div class="collapsible-body">
          <p>{{ entry.created  | moment "DD/MM//YY - h:mm a" }}</p>
          <p>{{ entry.hours }} hours</p>
          <p>{{ entry.notes }}</p>
          <button class="waves-effect waves-light btn" @click="delEntry(entry._id)">Remove</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://tickbot-server.willisite.com/')

export default {
  data () {
    return {
      entries: []
    }
  },
  ready () {
    this.list()
  },
  methods: {
    list () {
      this.$http.get('api/entries')
        .then(entries => this.$set('entries', entries.data))
        .catch(e => console.log(e))
    },
    delEntry (id) {
      socket.emit('delete', { id })
    }
  }
}
</script>
