<template>
  <div>
    <TagSelect
      type="popup"
      :value="value"
      @change="onChange"
    >
      <!-- <template #default>
        111111
      </template> -->
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
    }
  },
  methods: {
    onChange (val) {
      console.log("🚀 ~ onChange ~ val:", val)
    }
  }
}
</script>
