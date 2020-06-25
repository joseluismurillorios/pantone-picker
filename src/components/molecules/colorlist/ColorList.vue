<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
const colors = [
  { name: 'PANTONE Yellow C', components: '#FFDC00' },
  { name: 'PANTONE Yellow 012 C', components: '#FFD600' },
  { name: 'PANTONE Orange 021 C', components: '#FF5200' },
  { name: 'PANTONE Warm Red C', components: '#FF4638' },
  { name: 'PANTONE Red 032 C', components: '#FA363F' },
];

export default {
  name: 'ColorList',
  data: () => ({
    colors,
  }),
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
