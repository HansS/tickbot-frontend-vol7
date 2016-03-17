<template>
  <div class="row" v-show="entries.length">
    <ul class="collection">
      <li class="collection-item avatar"
        v-for="entry in entries"
        track-by="_id"
        :class="{ editing: entry == editedEntry }">
        <img src="https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_48.jpg" alt="" class="circle">
        <span class="title">{{ entry.username }}</span>
        <p>{{ entry.username }} <br>
          {{ entry.project }}
          {{ entry.hours }}
          {{ entry.notes }}
          {{ entry.created  | moment "DD/MM//YY - h:mm a" }}
        </p>
        <button class="waves-effect waves-light btn" @click="delEntry(entry._id)">Remove</button>
      </li>
    <ul>
  </div>
</template>

<script>
// import io from 'socket.io-client'
// const socket = io('http://localhost:1338')

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
    }
  }
}
</script>
