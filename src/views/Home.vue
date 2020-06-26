<template>
  <div class="home p-4">
    <!-- <alert /> -->
    <ColorList />
  </div>
</template>

<script>
// @ is an alias to /src
import ColorList from '@/components/molecules/colorlist/ColorList.vue';
// import alert from '@/components/snippets/alert.vue';

export default {
  name: 'Home',
  components: {
    ColorList,
    // alert,
  },
};
</script>
