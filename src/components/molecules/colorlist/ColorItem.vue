<template>
  <div :class="['color__item mb-1 text-center', classProp]">
    <p
      class="color__preview h-8 md:h-5 text-2xs cursor-pointer flex items-center justify-center text-center"
      :style="{ 'background-color': color.components, 'color': color.components }"
      v-on:click="copy(color.components, color.name)"
      :ref="color.components"
      v-on:mouseenter="enter(color.name.replace('PANTONE', ''))"
      v-on:mouseout="exit(color.name)"
    >
      {{color.components}}
    </p>
    <!-- <span class="color__name text-2xs">
      {{ color.name.replace('PANTONE', '') }}
    </span> -->
    <p
      class="color__hex truncate text-2xs tracking-wider font-bold hidden md:block"
    >
      {{showNames ? color.name.replace('PANTONE', '') : color.components}}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { copyText } from '@/helpers/helper-util';

export default {
  name: 'ColorItem',
  props: {
    color: Object,
    classProp: String,
    onEnter: Function,
    onExit: Function,
    onCopy: Function,
  },
  computed: {
    ...mapState({
      showNames: (state) => state.filter.showNames,
    }),
  },
  methods: {
    enter(e) {
      this.$props.onEnter(e, this.$refs[this.$props.color.components]);
    },
    exit(e) {
      this.$props.onExit(e, this.$refs[this.$props.color.components]);
    },
    copy(str, name) {
      copyText(str, name, this.$props.onCopy);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
