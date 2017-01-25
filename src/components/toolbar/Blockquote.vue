<template>
  <a title="code block"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-quote']"></i>
  </a>
</template>

<script>
export default {
  props: [
    'selection',
    'caretPos',
    'step',
    'setContent',
    'setCaretPosition',
    'setTextSelected',
    'insertAtCaret'
  ],
  mounted: function () {
  },
  methods: {
    clickHandler: function () {
      var arr = this.selection
      var pos = this.caretPos['start']

      if (!arr[0].match(/[\n]$/)) {
        var blocks = arr[0].split('\n')
        if (blocks.length === 0) return
        var str = blocks.pop()
        var len = arr[0].length
        var before = arr[0].substring(0, len - str.length)
        this.setContent(before + '> ' + str + arr[1] + arr[2])
      // 光标前是换行则直接插入 #n + 标题
      } else {
        this.setContent(arr[0] + '> ' + arr[1] + arr[2])
      }
      this.setCaretPosition(pos + 2)
    }
  }
}
</script>

<style>
</style>
