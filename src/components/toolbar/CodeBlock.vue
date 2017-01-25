<template>
  <a title="code block"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-code']"></i>
  </a>
</template>

<script>
export default {
  props: ['selection', 'caretPos', 'step', 'setContent', 'setCaretPosition'],
  mounted: function () {
  },
  methods: {
    clickHandler: function () {
      var arr = this.selection
      var pos = this.caretPos['start']
      this.setContent(arr[0] + '\n```\n' + arr[1] + '\n```' + arr[2])
      this.setCaretPosition(pos + 5)
    }
  }
}
</script>

<style>
</style>
