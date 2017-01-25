<template>
  <a title="new line"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-enter']"></i>
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
      this.setContent(arr[0] + arr[1] + '  \n' + arr[2])
      this.setCaretPosition(pos + 3)
    }
  }
}
</script>

<style>
</style>
