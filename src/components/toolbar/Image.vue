<template>
  <a title="upload image" class="upload-img" href="javascript:;">
    <span v-if="uploading">
      <input ref="file" accept="image/png,image/gif,image/jpeg,image/svg+xml" @change="browserFile" type="file" />
      <i :class="['icon', 'muefont', 'icon-mue-image']"></i>
    </span>
    <span style="display: inline-block;" v-else>
      <i :class="['icon', 'muefont', 'icon-mue-loading']"></i>
    </span>
  </a>
</template>

<script>
export default {
  props: ['selection', 'caretPos', 'step', 'setContent', 'setCaretPosition', 'insertAtCaret'],
  data: function () {
    return {
      uploading: false
    }
  },
  mounted: function () {
    var self = this
    this.fileReader = new window.FileReader()
    this.fileReader.onload = function (event) {
      self.$post('zhijia/file/upload/base64', { filefield: event.target.result, flag: 1 }, function (res) {
        self.uploading = false
        if (res.data.success && res.data.file_path) {
          self.insertAtCaret('\n![](' + res.data.file_path + ')\n')
        } else {
          self.$error(res.data)
        }
      })
    }
  },
  methods: {
    browserFile: function () {
      try {
        this.file = this.$refs.file.files[0]
        if (!this.file.type.match(/image\/.*/i)) {
          this.$error('不支持的文件格式')
          return
        }
        this.uploading = true
        this.fileReader.readAsDataURL(this.file)
      } catch (err) {
      }
    }
  }
}
</script>

<style>
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.icon-mue-loading {
  animation: rotating 1s linear infinite;
  transform-origin:51% 49%; display: block;
}
</style>
