# TagSelect 按钮

### 介绍

TagSelect 标签选择组件

### 引入

```js
import { TagSelect } from '@ka/pc';
```

## 代码演示

### 设置 Cookie

<demo-code>./demo/cookie.vue</demo-code>

### 基础用法

<demo-code>./demo/index.vue</demo-code>

### Select 选择标签

<demo-code>./demo/select.vue</demo-code>

### Popover 选择标签

<demo-code>./demo/popover.vue</demo-code>


## API

### Props

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| type          | 选择器类型 `base` `select` `popup` | _string_ | `base` |
| value | 默认值 | _array_ | -         |
| maxNum | 最多选择标签数 **0=>不限制** | _number_ | 0         |
| showSelectedTagsBox | 是否显示已选标签 | _boolean_ | false         |

### Events

| 事件名 | 说明       | 回调参数            |
| ------ | ---------- | ------------------- |
| change  | 选择标签数据变化触发 | _event: MouseEvent_ |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽，type 为 `popup` 时生效 |
