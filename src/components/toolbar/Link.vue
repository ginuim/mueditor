<template>
  <a title="unordered list"
    @click="clickHandler"
    :class="['tool']"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-link']"></i>
  </a>
</template>

<script>
export default {
  props: ['selection', 'caretPos', 'step', 'setContent', 'setCaretPosition', 'setTextSelected'],
  mounted: function () {
  },
  methods: {
    clickHandler: function () {
      var arr = this.selection
      var pos = this.caretPos['end']
      this.setContent(arr[0] + '[' + arr[1].replace(/\n/g, '') + '](link)' + arr[2])
      this.setTextSelected(pos + 10, pos + 13)
    }
  }
}
</script>

<style>
</style>
