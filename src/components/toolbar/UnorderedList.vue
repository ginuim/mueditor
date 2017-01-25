<template>
  <a title="unordered list"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-ul']"></i>
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
      var pos = this.caretPos['end']
      var blocks = arr[1].split('\n')
      var content = arr[0]
      var delta = 0
      for (var i = 0; i < blocks.length; i++) {
        if (blocks[i]) {
          content += '- ' + blocks[i] + '\n'
          delta += 2
        } else {
          delta -= 1
        }
      }
      this.setContent(content + arr[2])
      this.setCaretPosition(pos + delta)
    }
  }
}
</script>

<style>
</style>
