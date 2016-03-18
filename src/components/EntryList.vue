<template>
  <div class="row" v-show="entries.length">
    <ul class="collapsible" data-collapsible="expandable">
      <li v-for="entry in entries" track-by="_id">
        <div class="collapsible-header">
          <img :src="entry.member.avatar" alt="" class="circle">
          {{ entry.member.name }} {{ entry.project }}
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
export default {
  data () {
    return {
      entries: []
    }
  },
  ready () {
    this.list()
    this.$socket.on('post', res => this.entries.push(res.entry))
    this.$socket.on('put', res => {
      const element = this.entries.find(entry => entry._id === res.id)
      this.entries.$set(element, res.message)
    })
    this.$socket.on('delete', id => {
      const element = this.entries.find(entry => entry._id === id)
      this.entries.$remove(element)
    })
  },
  methods: {
    list () {
      this.$http.get('api/entries')
        .then(entries => this.$set('entries', entries.data))
        .catch(e => console.log(e))
    },
    delEntry (id) {
      this.$socket.emit('delete', { id })
    }
  }
}
</script>
