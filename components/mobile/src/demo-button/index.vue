<template>
  <button class="demo-button" :style="{
    'background-color': color,
  }">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'demo-button',

  props: {
    color: String,
    type: {
      type: String,
      default: '#f44',
    },
  },
};
</script>

<style lang="scss">
.demo-button {
  min-width: 120px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  border: none;
  border-radius: 30px;
}
</style>
