<template>
  <el-popover
    class="tag-select--tags-board-popover"
    popper-class="tag-select--tags-board-popover-popup"
    placement="bottom-start"
    width="685"
    v-model="visible"
  >
    <BoardBase
      ref="board"
      height="350px"
      :value="value"
      :maxNum="maxNum"
      showSelectedTagsBox
      @change="onChange"
      @cancel="onCancel"
    />

    <div slot="reference">
      <slot name="default">
        <div class="popup-select-tags">
          <div class="select-tag">
            <span v-if="!selectTagList.length">添加标签</span>
            <i class="el-icon-edit"></i>
          </div>
        </div>
      </slot>
    </div>
  </el-popover>
</template>

<script>
import { Button, Popover } from 'element-ui'
import BoardBase from '../board-base/index.vue'
import { tagSelectProps } from '../../types'

export default {
  components: {
    [Button.name]: Button,
    [Popover.name]: Popover,
    BoardBase,
  },
  props: {
    ...tagSelectProps,
    search: {
      type: Boolean,
      default: true
    },
  },
  emits: ['change'],
  data () {
    return {
      visible: false,
      selectTagList: []
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
    },
  }
}
</script>

<style lang="scss">
.tag-select--tags-board-popover {
  .popup-select-tags {
    display: flex;
    .select-tag {
      font-size: 12px;
      color: #707e98;
      cursor: pointer;

      > span {
        margin-right: 3px;
      }
    }
  }
}
.tag-select--tags-board-popover-popup {
  padding: 0;

  .select-tags-box {
    padding: 16px 0 0 16px;
  }
}
</style>
