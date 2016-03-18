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
              {{ project }}
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
      projects: ['tickbot', 'tickbot-server', 'tickbot-frontend'],
      members: [
        {
          id: 'U034QMY7N',
          team_id: 'T034QMY7L',
          name: 'alex',
          deleted: false,
          status: null,
          color: '9f69e7',
          real_name: 'Alexander Haniotis',
          tz: 'America/Los_Angeles',
          tz_label: 'Pacific Daylight Time',
          tz_offset: -25200,
          profile: {
            image_24: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_24.jpg',
            image_32: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_32.jpg',
            image_48: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_48.jpg',
            image_72: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_72.jpg',
            image_192: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_192.jpg',
            image_original: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_original.jpg',
            first_name: 'Alexander',
            last_name: 'Haniotis',
            title: 'Partner, Design',
            skype: '',
            phone: '514-926-8972',
            image_512: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_192.jpg',
            image_1024: 'https://avatars.slack-edge.com/2015-10-07/12106965937_eb3eedd4e63414f512cf_192.jpg',
            real_name: 'Alexander Haniotis',
            real_name_normalized: 'Alexander Haniotis',
            email: 'alex@volume7.io'
          },
          is_admin: true,
          is_owner: true,
          is_primary_owner: true,
          is_restricted: false,
          is_ultra_restricted: false,
          is_bot: false
        }
      ]
    }
  },
  methods: {
    newEntry () {
      socket.emit('post', { entry: this.entry })
    }
  }
}
</script>
