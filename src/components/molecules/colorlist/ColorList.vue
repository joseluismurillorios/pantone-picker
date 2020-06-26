<template>
  <div class="colors__list p-4 w-full bg-white rounded shadow-sm">
    <div class="colors__list--inner flex flex-wrap">
      <div
        v-for="(group, i) in groups"
        :key="'group-' + i"
        class="colors__list--group flex lg:flex-col mb-1 text-center w-full lg:w-1/19"
        :class="i > 0 && i % 18 === 0 ? 'mb-5' : ''"
      >
        <ColorItem
          v-for="(color, j) in group"
          :key="color.name + j"
          :color="color"
          classProp="color relative w-1/7 lg:w-full"
          :onEnter="enter"
          :onExit="exit"
        />
      </div>
    </div>
    <transition name="fade">
      <div
        class="
          tooltip
          fixed
          z-10
          bg-black
          px-4
          py-1
          rounded
          text-white
          text-2xs
          font-bold
          tracking-wider
          transform
          -translate-x-1/2
          truncate
        "
        :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
        v-if="tooltip.show"
        transition="fade"
      >
        {{tooltip.text}}
      </div>
    </transition>
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
    tooltip: {
      x: 0,
      y: 0,
      show: false,
      text: 'Tooltip',
    },
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
    enter(e, elem) {
      const rect = elem.getBoundingClientRect();
      this.tooltip = {
        x: rect.x + (rect.width / 2),
        // y: rect.y - rect.height + window.scrollY,
        y: rect.y - rect.height,
        text: e,
        show: true,
      };
    },
    exit() {
      this.$set(this.tooltip, 'show', false);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
