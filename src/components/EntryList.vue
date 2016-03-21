<template>

  <div class="row">
    <div class="input-field col s12">
      <label for="search">Search</label>
      <input type="text" v-model="search">
    </div>
  </div>

  <div class="row" v-show="entries.length">
    <ul class="" data-collapsible="expandable">
      <li v-for="entry in entries | filterBy search" track-by="_id">
        <div class="r">
          <img :src="entry.member.avatar" alt="" class="circle">
          <label v-text="entry.member.name" @dblclick="editing = true"></label>
          <input class="edit"
            v-show="editing"
            v-focus="editing"
            :value="entry.member.name"
            @keyup.enter="doneEdit"
            @keyup.esc="cancelEdit"
            @blur="doneEdit">
          {{ entry.project }}
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
      search: '',
      editing: false,
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
  directives: {
    focus (value) {
      if (value) {
        this.vm.$nextTick(() => this.el.focus())
      }
    }
  },
  methods: {
    list () {
      this.$http.get('api/entries')
        .then(entries => this.$set('entries', entries.data))
        .catch(e => console.log(e))
    },
    delEntry (id) {
      this.$socket.emit('delete', { id })
    },
    doneEdit (e) {
      const value = e.target.value.trim()
      if (!value) {
        // this.deleteTodo(this.entry)
      } else if (this.editing) {
        // this.$http.put('api/entries/${e._id}')
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
}
</script>
