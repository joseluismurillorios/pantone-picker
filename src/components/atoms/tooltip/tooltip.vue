<template>
  <transition name="fade">
    <div
      :class="['tooltip fixed z-10', className]"
      :style="{ left: `${x}px`, top: `${y}px` }"
      v-if="show"
      transition="fade"
    >
      {{text}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'tooltip',
  props: {
    className: {
      type: String,
      default: '',
    },
    x: {
      type: Number,
      default: 0,
    },
    y: {
      type: Number,
      default: 0,
    },
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Tooltip',
    },
  },
};
</script>

<style>

</style>
