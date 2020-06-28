<template>
  <input
    class="range range-slider rounded-lg overflow-hidden appearance-none outline-none bg-gray-300 min-w-1/4"
    :class="className"
    type="range"
    min="80"
    max="360"
    :value="value"
    step="2"
    @input="onUpdate"
  />
</template>

<script>
export default {
  name: 'slider',
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
      default: '160',
    },
    onChange: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onUpdate(e) {
      this.onChange({
        name: this.name,
        value: e.target.value,
      });
    },
  },
};
</script>

<style lang="scss">
$track: 14px;
$thumb: 12px;
$radius: 12px;
$top: ($track - $thumb) / 2 - 1px;
$cthumb: #ffffff;
$ctrack: #667eea;

.range::-webkit-slider-runnable-track {
  background-color: $ctrack;
  height: $track;
  border-radius: $radius;
  border: 1px solid transparent;
  padding: 0 $top;
}

.range[disabled]::-webkit-slider-runnable-track {
  border: 1px solid $ctrack;
  background-color: transparent;
  opacity: 0.4;
}

.range::-moz-range-track {
  background-color: $ctrack;
  height: $track;
  border-radius: $radius;
  border: none;
}

.range::-ms-track {
  color: transparent;
  border: none;
  background: none;
  height: $track;
}

.range::-ms-fill-lower {
  background-color: $ctrack;
  border-radius: $radius;
}

.range::-ms-fill-upper {
  background-color: $ctrack;
  border-radius: $radius;
}

.range::-ms-tooltip { display: none; /* display and visibility only */ }

.range::-moz-range-thumb {
  border-radius: 100%;
  height: $thumb;
  width: $thumb;
  border: none;
  background: none;
  background-color: $cthumb;
}

.range:active::-moz-range-thumb {
  outline: none;
}

.range::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  border-radius: 100%;
  background-color: $cthumb;
  height: $thumb;
  width: $thumb;
  margin-top: $top;
}

.range[disabled]::-webkit-slider-thumb {
  background-color: transparent;
  border: 1px solid $ctrack;
}

.range:active::-webkit-slider-thumb {
  outline: none;
}

.range::-ms-thumb {
  border-radius: 100%;
  background-color: $cthumb;
  height: $thumb;
  width: $thumb;
  border: none;
}

.range:active::-ms-thumb {
  border: none;
}
</style>
