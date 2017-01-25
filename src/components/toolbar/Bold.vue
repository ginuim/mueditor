<template>
  <a title="bold"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-bold']"></i>
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
    'setTextSelected'
  ],
  mounted: function () {
  },
  methods: {
    clickHandler: function () {
      var arr = this.selection
      var pos = this.caretPos['start']
      this.setContent(arr[0] + '**' + arr[1] + '**' + arr[2])
      this.setTextSelected(pos + 2, pos + arr[1].length + 2)
    }
  }
}
</script>

<style>
</style>
