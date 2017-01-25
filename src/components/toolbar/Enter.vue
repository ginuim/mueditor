<template>
  <a title="new line"
    @click="clickHandler"
    :class="['tool', 'small']"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-enter']"></i>
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
      var pos = this.caretPos['end']
      this.setContent(arr[0] + arr[1] + '  \n' + arr[2])
      this.setCaretPosition(pos + 3)
    }
  }
}
</script>

<style>
</style>
