<template>
  <div id="app" class="font-sans bg-gray-200">
    <Router />
    <div class="router overflow-x-hidden w-full">
      <transition :name="transitionName">
        <router-view class="child-view mt-20 sm:mt-0 w-full z-1" />
      </transition>
    </div>
    <!-- <router-view/> -->
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
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    next();
  },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.child-view {
  overflow-x: hidden;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.child-view {
  transition: all 0.75s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active {
  position: absolute;
  width: 100%;
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
