<template>
  <div id="app">
    <Header msg="Welcome to Your Vue.js App"/>
    <Container/>
  </div>
</template>

<script>
import Header from './components/header/index.vue'
import Container from './components/container/index.vue'

export default {
  name: 'App',
  components: {
    Header,
    Container
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
