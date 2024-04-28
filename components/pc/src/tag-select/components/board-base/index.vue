<template>
  <div class="tag-select--tags-board">
    <div class="select-box-container">
      <div class="select-tags-box">
        <div class="search-box">
          <el-input v-model="tagGroupName" size="small" placeholder="请输入名称进行搜索" @change="onSearch"></el-input>
        </div>
        <el-tabs v-model="activeName" @tab-click="getTagList()">
          <el-tab-pane v-for="item in currTagTypeList" :key="item.value" :label="item.label" :name="item.value">
            <template v-if="boardItemList.length">
              <BoardItem
                :style="styles"
                :value="value"
                :maxNum="maxNum"
                :selectTagList="selectTagList"
                :list="boardItemList"
                :tagCategoryId="boardItemCategoryId"
                :disabled="disabledSelect"
                @select-change="onSelectChange"
              />
            </template>
            <el-empty v-else description="暂无数据"></el-empty>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="showSelectedTagsBox" class="selected-tags-box">
        <selected-tags
          :selectTagList="selectTagList"
          :maxNum="maxNum"
          @remove="removeSelectTag"
          @clear="removeAllSelectTag"
        />
      </div>
    </div>
    <div v-if="showSelectedTagsBox" class="footer-box">
      <el-button size="mini" @click="onCancel">取 消</el-button>
      <el-button type="primary" size="mini" :disabled="selectTagList.length === 0" @click="onConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { Input, Button, Tabs, TabPane, Empty } from 'element-ui'
import BoardItem from './board-item.vue'
import SelectedTags from '../selected-tags/index.vue'
import useApi from '../../composables/useApi'
import { tagSelectProps } from '../../types'

export default {
  name: 'TagsBoard',
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Empty.name]: Empty,
    BoardItem,
    SelectedTags,
  },
  props: {
    ...tagSelectProps,
    search: {
      type: Boolean,
      default: true
    },
  },
  emits: ['change', 'cancel'],
  data() {
    return {
      activeName: 'qw',
      tagGroupName: '',
      tagTypeList: [
        { label: '企业标签', value: 'qw', tagCategoryId: 1 },
        { label: '群标签', value: 'chatroom', tagCategoryId: 3 },
      ],
      tagData: {},
      boardItemList: [],
      selectTagList: []
    };
  },
  computed: {
    currTagTypeList () {
      return this.tagTypeList.filter(item => this.tagType.includes(item.value))
    },
    disabledSelect () {
      return !!(this.maxNum > 0 && this.selectTagList.length >= this.maxNum)
    },
    boardItemCategoryId () {
      return this.tagTypeList.find(item => item.value === this.activeName).tagCategoryId
    },
    styles () {
      return {
        height: this.height || 'auto'
      }
    }
  },
  watch: {
    value: {
      handler (nv) {
        this.selectTagList = nv
      },
      immediate: true,
      deep: true
    },
    tagType: {
      handler (nv) {
        if (nv && nv.length > 0) {
          this.activeName = nv[0]
          this.tagData = {}
          nv.forEach(item => {
            this.tagData[`${item}`] = []
          });
        }
      },
      immediate: true,
      deep: true
    },
    selectTagList: {
      handler (nv) {
        if (!this.showSelectedTagsBox) this.$emit('change', nv)
      },
      immediate: true,
      deep: true
    },
  },
  async mounted () {
    this.getTagList()
  },
  methods: {
    // 判断当前标签类型数据是否存在（避免重复请求）
    checkCurrTypeListExist () {
      return Object.prototype.hasOwnProperty.call(this.tagData, this.activeName) && this.tagData[`${this.activeName}`].length > 0
    },
    // 切换Tab获取标签列表
    async getTagList (params = {}, isSearch = false) {
      if (!this.checkCurrTypeListExist() || isSearch) {
        const { tagGroupList } = useApi()
        const list = await tagGroupList({
          tagCategoryId: this.boardItemCategoryId,
          tagGroupName: this.tagGroupName,
          ...params
        });
        this.$set(this.tagData, this.activeName, list)
      }
      this.setItemList()
    },
    onSearch () {
      // 清除现有数据
      Object.keys(this.tagData).forEach(key => {
        this.tagData[key] = []
      })
      this.getTagList({}, true)
    },
    setItemList () {
      this.boardItemList = this.tagData[`${this.activeName}`]
    },
    // 判断需要添加的标签是否已存在
    selectTagIsExist (item) {
      return this.selectTagList.some(tag => tag.groupId === item.groupId && tag.id === item.id)
    },
    // 添加新选择的标签
    addSelectTag (item) {
      if (this.selectTagIsExist(item)) return
      else this.selectTagList.push(item)
    },
    // 移除已选择的标签
    removeSelectTag (item) {
      for (let i = 0; i < this.selectTagList.length; i++) {
        const { id, groupId } = this.selectTagList[i]
        if (groupId === item.groupId && id === item.id) {
          this.selectTagList.splice(i, 1)
        }
      }
    },
    // 清空已选标签
    removeAllSelectTag () {
      this.selectTagList = []
      this.$set(this, 'selectTagList', [])
    },
    // 选择标签变化
    onSelectChange (item, type) {
      if (type === 'add') {
        this.addSelectTag(item)
      } else {
        this.removeSelectTag(item)
      }
    },
    onConfirm () {
      this.$emit('change', this.selectTagList)
      this.onCancel()
    },
    onCancel () {
      this.$emit('cancel')
    },
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav.is-top {
  margin-left: 0 !important;
}

.select-box-container {
  display: flex;
  justify-content: space-between;

  .select-tags-box {
    flex: 1;
    min-width: 0;
  }

  .selected-tags-box {
    width: 35%;
    flex-shrink: 0;
    margin-left: 16px;
    border-left: 1px solid #EEEFF3;
  }
}

.footer-box {
  display: flex;
  justify-content: flex-end;
  padding: 12px 20px;
  border-top: 1px solid #EEEFF3;
}
</style>
