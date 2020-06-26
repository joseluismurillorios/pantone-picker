<template>
  <div :class="['color__item mb-1', classProp]">
    <p
      class="color__preview h-8 md:h-5 text-2xs cursor-pointer flex items-center justify-center"
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
      class="color__hex text-2xs tracking-wider font-bold hidden md:block"
    >
      {{ color.components }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'ColorList',
  props: {
    color: Object,
    classProp: String,
    onEnter: Function,
    onExit: Function,
    onCopy: Function,
  },
  methods: {
    enter(e) {
      this.$props.onEnter(e, this.$refs[this.$props.color.components]);
    },
    exit(e) {
      this.$props.onExit(e, this.$refs[this.$props.color.components]);
    },
    copy(str, name) {
      const el = document.createElement('textarea');
      el.value = str;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected = document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
      this.$props.onCopy(str, name);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
