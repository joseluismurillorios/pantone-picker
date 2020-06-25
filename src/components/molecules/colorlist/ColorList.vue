<template>
  <div class="colors__holder">
    <div class="colors__inner">
      <div
        v-for="(group, i) in groups"
        :key="'group-' + i"
        class="colors__group flex flex-col mb-1 text-center"
        :class="i > 0 && i % 19 === 0 ? 'mb-4' : ''"
      >
        <div
          v-for="(color, j) in group"
          :key="color.name + j"
          class="color"
        >
          <div class="color__preview h-6" :style="{ 'background-color': color.components }" />
          <!-- <span class="color__name text-2xs">
            {{ color.name.replace('PANTONE', '') }}
          </span> -->
          <p class="color__hex text-2xs">{{ color.components }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colors from '@/helpers/helper-color';

export default {
  name: 'ColorList',
  data: () => ({
    colors,
    cards: [],
    groups: {},
  }),
  created() {
    this.displayInitialDeck();
  },
  methods: {
    displayInitialDeck() {
      console.log(colors);
      this.groups = {};
      let currentRowIndex = 0;
      let currentIndex = 0;
      for (let i = 0; i < colors.length; i += 1) {
        if (colors[i].name === 'NextPage') {
          // this.$set(this.groups, currentRowIndex, groups[currentRowIndex]);
          // this.cards.push(this.groups[currentRowIndex]);
          currentRowIndex += 1;
          currentIndex = 0;
        } else {
          if (i !== 0 && (currentIndex + 1) % 8 === 0) {
            // this.$set(this.groups, currentRowIndex, groups[currentRowIndex]);
            // this.cards.push(this.groups[currentRowIndex]);
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
.colors {
  &__holder {
    text-align: left;
    width: 100%;
    padding: 30px;
    .color {
      // width: calc(100% / 7);
      // height: 28px;
      display: inline-block;
    }
  }
  &__group {
    width: calc(100% / 19);
  }
  &__inner {
    display: flex;
    flex-wrap: wrap;
  }
}
.f-full {
  width: 98%;
  flex: 0 0 98%;

  visibility: hidden;
  padding: 0;
  margin: 0;
  height: 0;
}
.f-seventh {
  width: 14%;
  flex: 0 0 14%;
}
</style>
