<template>
  <div class="tag-select--selected-tags-box">
    <div class="title">
      <span>已选标签：{{ maxNum !== 0 ? `${maxNum}/` : '' }}{{ selectTagList.length }}</span>
      <span :class="{ 'clear': true, 'disabled': !selectTagList.length }" @click="onClear">
        <i class="el-icon-delete"></i>
        <span>清空</span>
      </span>
    </div>
    <div class="main-content">
      <template v-if="selectTagList.length">
        <span class="board-item-content-item" v-for="item in selectTagList" :key="item.id">
          <span>{{ item.name }}</span>
          <i class="el-icon-close anticon" @click="onRemoveTag(item)"></i>
        </span>
      </template>
      <el-empty v-else description="暂无数据"></el-empty>
    </div>
  </div>
</template>

<script>
import { Empty } from 'element-ui'

export default {
  name: 'SelectedTags',
  components: {
    [Empty.name]: Empty,
  },
  props: {
    selectTagList: {
      type: Array,
      default: () => []
    },
    maxNum: {
      type: Number,
      default: 0,
    },
  },
  emits: ['remove', 'clear'],
  methods: {
    // 移除
    onRemoveTag (item) {
      this.$emit('remove', item)
    },
    onClear () {
      if (this.selectTagList.length === 0) return
      this.$emit('clear')
    },
  }
};
</script>

<style lang="scss">
.tag-select--selected-tags-box {

  .title {
    padding: 0 16px;
    height: 56px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .clear {
      color: #D20A10;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;

      &.disabled {
        cursor: not-allowed !important;
        color: #AFB7C7;
      }

      >span {
        margin-left: 3px;
      }
    }
  }

  .main-content {
    padding: 0 16px;
    max-height: 395px;
    overflow-x: hidden;
    overflow-y: auto;

    .board-item-content-item {
      box-sizing: border-box;
      margin: 0 8px 8px 0;
      position: relative;
      display: inline-block;
      height: 24px;
      padding: 0 8px;
      font-size: 12px;
      line-height: 22px;
      white-space: nowrap;
      background: #eeeff3;
      border: 1px solid transparent;
      border-radius: 4px;
      opacity: 1;
      transition: all .3s;

      .anticon {
        margin-left: 3px;
        color: #707e98;
        font-size: 10px;
        padding: 3px;
        cursor: pointer;
        transition: all .3s;
        position: relative;
        top: -.5px;
        border-radius: 50%;

        &:hover {
          background: rgba(44, 64, 104, .1);
        }
      }
    }
  }
}
</style>
