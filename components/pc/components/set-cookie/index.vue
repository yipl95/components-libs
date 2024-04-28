<template>
  <div class="set-cookie-box">
    <el-input placeholder="请输入Cookie" v-model="value" clearable>
      <template slot="append">
        <el-button type="primary" @click="onClick">设置</el-button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { Input, Button, Message } from 'element-ui'

export default {
  name: 'SetCookie',
  components: {
    [Input.name]: Input,
    [Message.name]: Message,
    [Button.name]: Button
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    onClick() {
      if (this.value) {
        document.cookie = this.value
        Message.success('设置成功')
        location.reload();
      } else {
        Message.warning('请输入cookie')
      }
    }
  }
}
</script>

<style lang="scss">
.set-cookie-box {
  margin-bottom: 30px;
}
</style>
