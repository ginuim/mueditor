<template>
  <a :title="'Heading ' + step"
    @click="clickHandler"
    :class="['h' + step]"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-h' + step]"></i>
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
      var h = ''
      for (var i = 0; i < this.step; i++) {
        h += '#'
      }
      var arr = this.selection
      var pos = this.caretPos['end']
      var delta = 0
      // 如果光标前不是换行的话则将 #n 标记插入到光标所在行首
      if (!arr[0].match(/[\n]$/)) {
        var blocks = arr[0].split('\n')
        if (blocks.length === 0) return
        var str = blocks.pop()
        var len = arr[0].length
        var before = arr[0].substring(0, len - str.length)
        if (typeof str === 'string') {
          var oldStr = str
          str = str.replace(/^[#\s]*/, '')
          delta = str.length - oldStr.length
        }
        this.setContent(before + h + ' ' + str + arr[1] + arr[2])
      // 光标前是换行则直接插入 #n + 标题
      } else {
        this.setContent(arr[0] + h + ' ' + arr[1] + arr[2])
      }
      this.setCaretPosition(pos + delta + this.step + 1)
    }
  }
}
</script>

<style>
</style>
