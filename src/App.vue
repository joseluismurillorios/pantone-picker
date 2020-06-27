<template>
  <div id="app" class="font-sans bg-gray-200">
    <Router />
    <router-view/>
  </div>
</template>

<script>
import Router from '@/router/Router.vue';
import store from '@/store';

export default {
  name: 'App',
  store,
  components: {
    Router,
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
