<template>
  <tooltip
    :show="tooltip.show"
    :x="tooltip.x"
    :y="tooltip.y"
    :text="tooltip.text"
  />
</template>

<script>
export default {
  name: 'dropdown',
  data: () => ({
    tooltip: {
      x: 0,
      y: 0,
      show: false,
      text: 'Tooltip',
    },
  }),
};
</script>

<style scoped lang="scss">
</style>
