<template>
  <div class="ka-ui__demo-button">
    DemoButton
  </div>
</template>
<script>
import { demoButtonProps } from './types'

export default {
  name: "DemoButton",
  props: demoButtonProps,
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss">
@import "../../style/reset.scss";
</style>

<style lang="scss" scoped>
@import "./index.scss";
</style>

