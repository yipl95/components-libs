<template>
  <div>
    <TagSelect
      type="select"
      :value="value"
      :maxNum="maxNum"
      @change="onChange"
    >
    </TagSelect>
  </div>
</template>

<script>
import TagSelect from '../index.vue'

export default {
  components: {
    TagSelect
  },
  data () {
    return {
      value: [],
      maxNum: 10
    }
  },
  methods: {
    onChange (val) {
      console.log("🚀 ~ onChange ~ val:", val)
    }
  }
}
</script>
