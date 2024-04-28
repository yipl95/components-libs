<template>
  <div class="ka-ui__tag-select">
    <component
      :is="componentsMap[type]"
      :value="modelVal"
      :maxNum="maxNum"
      :showSelectedTagsBox="showSelectedTagsBox"
      @change="onChange"
    >
      <template #default>
        <slot name="default"></slot>
      </template>
    </component>
  </div>
</template>

<script>
import BoardBase from './components/board-base/index.vue'
import BoardPopup from './components/board-popup/index.vue'
import BoardSelect from './components/board-select/index.vue'
import { tagSelectProps } from './types'

export default {
  name: 'TagSelect',
  components: {
    BoardBase,
    BoardPopup,
    BoardSelect,
  },
  props: tagSelectProps,
  emits: ['change'],
  data () {
    return {
      modelVal: [],
      componentsMap: {
        'base': 'BoardBase',
        'popup': 'BoardPopup',
        'select': 'BoardSelect',
      }
    }
  },
  watch: {
    value: {
      handler (nv) {
        this.modelVal = nv
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onChange (val) {
      this.$emit('change', val)
    },
  }
};
</script>

<style lang="scss">
@import "../../style/reset.scss";
</style>

<style lang="scss" scoped>
@import "./index.scss";
</style>
