<template>
  <div class="tag-select--tags-board-item-container">
    <div class="tag-select--tags-board-item" v-for="item in list" :key="item.id">
      <div class="board-item-title" @click="onClickTitle(item)">
        <div class="title-left">{{ item.groupName }}</div>
        <div class="title-right">
          <!-- 全选 -->
          <el-checkbox class="check-all" v-model="item.checkAll" :disabled="checkAllDisabled(item)" @change="onCheckAllChange(item)" />
          <!-- 折叠图标 -->
          <i :class="item.loading ? 'el-icon-loading' : (item.fold ? 'el-icon-caret-bottom' : 'el-icon-caret-bottom deg180')"></i>
        </div>
      </div>
      <div class="board-item-content" :class="{'fold': item.fold}">
        <template v-if="item.list && item.list.length">
          <span :class="{ 'active': n.active, 'board-item-content-item': true, 'disabled': !n.active && disabled }" v-for="n in item.list" :key="n.id" @click="onClickTag(n, item)">{{ n.name }}</span>
        </template>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tag, Checkbox } from 'element-ui';
import useApi from '../../composables/useApi'

export default {
  name: 'BoardItem',
  components: {
    [Tag.name]: Tag,
    [Checkbox.name]: Checkbox,
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    tagCategoryId: {
      type: Number,
    },
    list: {
      type: Array,
      default: () => [],
    },
    selectTagList: {
      type: Array,
      default: () => [],
    },
    maxNum: {
      type: Number,
      default: 0,
    },
  },
  emits: ['select-change'],
  watch: {
    selectTagList: {
      handler (nv) {
        this.setTagIsChecked()
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    // 判断需要添加的标签是否已存在
    selectTagIsExist (item) {
      return this.selectTagList.some(tag => tag.groupId === item.groupId && tag.id === item.id)
    },
    // 监听已选标签，动态设置是否选中
    setTagIsChecked () {
      (this.list || []).forEach(item => {
        if (item.list && item.list.length) {
          item.list.forEach(tag => {
            // 如果当前标签已选中，但是已选标签不存在，则取消选中
            if (tag.active && !this.selectTagIsExist(tag)) {
              tag.active = false
            }
          })
          // 判断全选是否勾选
          item.checkAll = item.list.length > 0 && item.list.filter(n => n.active).length === item.list.length
        }
      })
    },
    // 设置默认选中项（回显）
    setActiveTag (list) {
      if (this.value && this.value.length) {
        this.value.forEach(tag => {
          list.forEach(listItem => {
            listItem.active = listItem.id === tag.id
          })
        })
      }
      return list
    },
    // 点击标题
    async onClickTitle (item) {
      // 已经展开标签列表 || 已经获取到标签列表数据
      if (!item.fold || (item.list && item.list.length)) {
        item.fold = !item.fold
        return
      }

      item.loading = true
      const { tagList } = useApi()
      const list = await tagList(this.tagCategoryId, item.id)
      item.list = this.setActiveTag(list)
      item.loading = false
      item.fold = !item.fold
    },
    // 点击标签
    onClickTag (item, parentItem) {
      if (!item.active && this.disabled) return
      item.active = !item.active
      this.$emit('select-change', item, item.active ? 'add' : 'remove')
      parentItem.checkAll = parentItem.list.length > 0 && parentItem.list.filter(n => n.active).length === parentItem.list.length
    },
    // 是否禁用全选
    checkAllDisabled (item) {
      if (!item.list || item.list.length === 0) return true
      if (this.maxNum === 0) return false

      // 剩余可选Tag数量
      const residueNum = this.maxNum - this.selectTagList.length
      // 当前类型下可选Tag数量（除去 selectTagList 中包含的Tag）
      const itemResidueNum = item.list.filter(tag => !tag.active).length
      return itemResidueNum > residueNum
    },
    // 全选
    onCheckAllChange (item) {
      const action = item.checkAll ? 'add' : 'remove';
      (item.list || []).map(n => {
        const shouldChange = item.checkAll ? !n.active : n.active;

        if (shouldChange) {
          n.active = item.checkAll;
          this.$emit('select-change', n, action);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.tag-select--tags-board-item-container {
  overflow-y: auto;
}

.tag-select--tags-board-item {
  margin-bottom: 6px;

  .board-item-title {
    padding: 0 4px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      background: #F8F9FA;
    }

    .el-icon-caret-bottom {
      transition: all linear 150ms;
    }

    .deg180 {
      transform: rotate(180deg);
    }

    .title-left {
      font-size: 14px;
      color: #1F2D3D;
    }

    .title-right {
      .check-all {
        margin-right: 10px;
      }
    }
  }

  .board-item-content {
    margin: 0 4px;
    padding: 4px 0;
    overflow: hidden;
    transition: all linear 150ms;
    &.fold {
      height: 0;
      padding: 0;
    }

    .board-item-content-item {
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      display: inline-block;
      margin: 0 8px 8px 0;
      padding: 0 8px;
      background-color: transparent;
      border: 1px solid #d9dde4;
      cursor: pointer;
      transition: all linear 150ms;
      border-radius: 4px;

      &:hover {
        background-color: #f4f6fa;
      }

      &.active {
        color: #D20A10;
        border-color: #D20A10;
      }

      &.disabled {
        background-color: #f8f9fa;
        color: #c7ccd7;
        border-color: #d9dde4;
      }
    }

    .no-data {
      font-size: 12px;
      line-height: 24px;
      color: #d9dde4;
      cursor: not-allowed;
    }
  }
}
</style>
