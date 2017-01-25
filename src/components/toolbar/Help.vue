<template>
  <a title="Help"
    @click="clickHandler"
    href="javascript:;"
    >
    <i :class="['icon', 'muefont', 'icon-mue-help']"></i>
  </a>
</template>

<script>
export default {
  props: ['selection', 'caretPos', 'step', 'setContent', 'setCaretPosition'],
  mounted: function () {
  },
  methods: {
    clickHandler: function () {
    }
  }
}
</script>

<style>
</style>
