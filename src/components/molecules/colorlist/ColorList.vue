<template>
  <div class="colors__holder p-4 w-full bg-white rounded shadow-sm">
    <div class="colors__inner flex flex-wrap">
      <div
        v-for="(group, i) in groups"
        :key="'group-' + i"
        class="colors__group flex lg:flex-col mb-1 text-center w-full lg:w-1/19"
        :class="i > 0 && i % 18 === 0 ? 'mb-5' : ''"
      >
        <div
          v-for="(color, j) in group"
          :key="color.name + j"
          class="color relative w-1/7 lg:w-full"
        >
          <ColorItem :color="color" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '@/helpers/helper-color';
import ColorItem from './ColorItem.vue';

export default {
  name: 'ColorList',
  data: () => ({
    colors,
    groups: {},
  }),
  components: {
    ColorItem,
  },
  created() {
    this.groupColors();
  },
  methods: {
    groupColors() {
      this.groups = {};
      let currentRowIndex = 0;
      let currentIndex = 0;
      for (let i = 0; i < colors.length; i += 1) {
        if (colors[i].name === 'NextPage') {
          currentRowIndex += 1;
          currentIndex = 0;
        } else {
          if (i !== 0 && (currentIndex + 1) % 8 === 0) {
            currentRowIndex += 1;
            currentIndex = 0;
          }
          if (!this.groups[currentRowIndex]) {
            this.groups[currentRowIndex] = [];
          }
          this.groups[currentRowIndex].push(colors[i]);
          currentIndex += 1;
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
