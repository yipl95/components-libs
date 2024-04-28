<template>
  <el-select 
    ref="select"
    v-model="selectTagList"
    value-key="name"
    class="tag-select--tags-board-select"
    popper-class="tag-select--tags-board-select-popup"
    placeholder="请选择"
    size="small"
    multiple
    collapse-tags
    clearable
    @change="changeSelectBrand"
  >
    <el-option :value="selectTagList" :style="{ display: 'none' }" />
    <BoardBase
      ref="board"
      height="350px"
      :value="value"
      :maxNum="maxNum"
      showSelectedTagsBox
      @change="onChange"
      @cancel="onCancel"
    />
  </el-select>
</template>

<script>
import { Select, Option } from 'element-ui'
import BoardBase from '../board-base/index.vue'
import { tagSelectProps } from '../../types'

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    BoardBase,
  },
  props: {
    ...tagSelectProps,
    search: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['change'],
  data () {
    return {
      visible: false,
      selectTagList: [],
    }
  },
  methods: {
    onChange (val) {
      this.selectTagList = val
      this.$emit('change', val)
      this.onCancel()
    },
    onCancel () {
      this.visible = false
      this.$refs.board.removeAllSelectTag && this.$refs.board.removeAllSelectTag()
      this.$refs.select.blur && this.$refs.select.blur()
    },
    changeSelectBrand (val) {
      console.log("🚀 ~ changeSelectBrand ~ val:", val)
    }
  }
}
</script>

<style lang="scss">
.tag-select--tags-board-select {
  width: 100%;
}

.tag-select--tags-board-select-popup {
  width: 680px;

  .el-select-dropdown__wrap {
    max-height: 800px;
  }

  .el-select-dropdown__item {
    height: auto;
    padding: 0 !important;
    background-color: #fff !important;
    &:hover {
      background-color: #fff !important;
    }

    &.selected {
      color: #606266 !important;
      font-weight: 400 !important;
    }
  }
  
  .select-box-container {
    padding: 0 16px;
  }
}
</style>
