<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
</style>

<template>
  <validator name="entry">

    <div class="validations col s12">
      <p v-if="$entry.created.required">Date required.</p>
    </div>

    <form class="col s12" @submit.prevent>
      <div class="row">
        <div class="input-field col s12">
          <select class="browser-default" v-model="entry.member">
            <option value="" disabled selected>Member</option>
            <option v-for="member in members" :value="{ name: member.profile.real_name, avatar: member.profile.image_48 }" data-icon="{{ member.profile.image_48 }}">
              {{ member.profile.real_name }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <select class="browser-default" v-model="entry.project" :value="project">
            <option value="" disabled selected>Project</option>
            <option v-for="project in projects">
              {{ project.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input type="number" v-model="entry.hours" min="0" max="24" />
          <label for="hours">Hours</label>
        </div>
      </div>

      <div class="row">
        <div class="input-field col s12">
          <input v-model="entry.notes" type="text" class="validate">
          <label for="notes">Notes</label>
        </div>
      </div>

      <div class="row">
        <input type="date" class="datepicker" v-model="entry.created" v-validate:created="['required']">
        <label for="date">Date</label>
      </div>

      <input class="waves-effect waves-light btn" type="submit" value="Submit" v-if="$entry.valid" @click="newEntry"></input>

    </form>
  </valdator>
</template>

<script>
import io from 'socket.io-client'
const socket = io('http://tickbot-server.willisite.com/')

export default {
  data () {
    return {
      entry: { member: {name: '', avatar: ''}, project: '', hours: '', notes: '', created: '' },
      projects: [],
      members: []
    }
  },
  ready () {
    this.getUsers()
    this.getProjects()
  },
  methods: {
    newEntry () {
      socket.emit('post', { entry: this.entry })
    },
    getUsers () {
      this.$http.get('https://slack.com/api/users.list?token=xoxp-3160746258-17429586099-26955572661-b1293c7688&pretty=1')
        .then(data => this.$set('members', data.data.members))
        .catch(e => console.log(e))
    },
    getProjects () {
      this.$http.get('https://slack.com/api/channels.list?token=xoxp-3160746258-17429586099-26955572661-b1293c7688&pretty=1')
        .then(data => this.$set('projects', data.data.channels))
        .catch(e => console.log(e))
    }
  }
}
</script>
