<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <entry-form></entry-form>
    <entry-list></entry-list>
  </section>
  <footer class="info">
    <p>Double-click to edit an entry</p>
    <p>Written by <a href="https://github.com/zombler">Connor Brathwaite</a> with &#x2615;</p>
    <p>Part of <a href="https://github.com/vol7/tickbot">Tickbot</a></p>
  </footer>
</template>

<script>
import EntryForm from './components/EntryForm'
import EntryList from './components/EntryList'

export default {
  components: {
    EntryForm,
    EntryList
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
