<template>
  <input
    class="range-slider rounded-lg overflow-hidden appearance-none outline-none bg-gray-300 h-3 w-128"
    :class="className"
    type="range"
    min="1"
    max="100"
    step="1"
    value="15"
  />
</template>

<script>
export default {
  name: 'range',
  props: {
    name: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '15',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
$cthumb: #667eea;

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input.range-slider[type='range']::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    box-shadow: -405px 0 0 400px $cthumb;
    border-radius: 50%;
  }
}
</style>
