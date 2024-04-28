<template>
  <div>
    <TagSelect
      :value="value"
      :maxNum="maxNum"
      @change="onChange"
    />
  </div>
</template>

<script>
import TagSelect from '../index.vue'

export default {
  components: {
    TagSelect,
  },
  data () {
    return {
      value: [{"id":466,"name":"未绑定","groupId":"58","groupName":"绑定状态","open":1,"active":true}],
      maxNum: 5
    }
  },
  methods: {
    onChange (val) {
      console.log("🚀 ~ onChange ~ val:", val)
    }
  }
}
</script>
