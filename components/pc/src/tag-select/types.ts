export const tagSelectProps = {
  // 类型
  type: {
    type: String,
    default: 'base',
  },
  tagType: {
    type: Array,
    default: () => ['qw', 'chatroom'],
  },
  // 回显数据
  value: {
    type: Array,
    default: () => []
  },
  // 最多选择标签数量
  maxNum: {
    type: Number,
    default: 0,
  },
  // 是否显示已选标签
  showSelectedTagsBox: {
    type: Boolean,
    default: false
  },
  search: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: '',
  },
};
