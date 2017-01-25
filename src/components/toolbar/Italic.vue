<template>
  <a title="italic"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-italic']"></i>
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
      this.setContent(arr[0] + '***' + arr[1] + '***' + arr[2])
      this.setTextSelected(pos + 3, pos + arr[1].length + 3)
    }
  }
}
</script>

<style>
</style>
