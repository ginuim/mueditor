<template>
  <div class="mueditor">
    <div class="mueditor-toolbar">
      <!-- 标题 -->
      <a title="Heading 1" @click="head(1)" class="tool small h1" href="javascript:;"><i class="muefont">&#xe603;</i></a>
      <a title="Heading 2" @click="head(2)" class="tool small h2" href="javascript:;"><i class="muefont">&#xe604;</i></a>
      <a title="Heading 3" @click="head(3)" class="tool small h3" href="javascript:;"><i class="muefont">&#xe606;</i></a>
      <a title="Heading 4" @click="head(4)" class="tool small h4" href="javascript:;"><i class="muefont">&#xe605;</i></a>
      <a title="Heading 5" @click="head(5)" class="tool small h5" href="javascript:;"><i class="muefont">&#xe608;</i></a>
      <a title="Heading 6" @click="head(6)" class="tool small h6" href="javascript:;"><i class="muefont">&#xe607;</i></a>
      <!-- 列表 -->
      <a title="无序列表" @click="ul" class="tool" href="javascript:;"><i style="font-size: 1rem" class="muefont">&#xe62e;</i></a>
      <!-- 换行 -->
      <a title="换行" @click="newline" class="tool small" href="javascript:;"><i class="muefont">&#xe6af;</i></a>
      <!-- 代码块 -->
      <a title="代码块" @click="block" class="tool block" href="javascript:;"><i class="muefont">&#xe65f;</i></a>
      <!-- 超链接 -->
      <a title="超链接" @click="link" class="tool link" href="javascript:;"><i class="muefont">&#xe634;</i></a>
      <span class="split">|</span>
      <!-- 上传图片 -->
      <a title="上传图片" class="tool upload-img" href="javascript:;">
        <span v-if="!uploading">
          <input ref="file" accept="image/png,image/gif,image/jpeg,image/svg+xml" @change="browserFile" type="file" />
          <i class="muefont" style="font-size: 1rem;">&#xe70e;</i>
        </span>
        <span style="display: inline-block;" v-else><i class="muefont i-loading">&#xe63c;</i></span>
      </a>
      <span class="split">|</span>
      <!-- 帮助 -->
      <a title="语法帮助" target="_blank" class="tool help" href="//zhijia.io/essay/104178">
        <i class="muefont">&#xe628;</i>
      </a>
    </div>
    <div class="editor-content">
      <textarea ref="editor" v-model="content"></textarea>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import utils from '../utils/utils'
export default {
  props: ['callback', 'syncContent', 'defaultContent', 'type', 'data', 'itemId'],
  components: {
  },
  data: function () {
    return {
      content: '',
      submitting: false,
      uploading: false,
      html: ''
    }
  },
  mounted: function () {
    var self = this
    this.uploading = false
    this.fileReader = new window.FileReader()
    this.fileReader.onload = function (event) {
      self.$post('zhijia/file/upload/base64', { filefield: event.target.result, flag: 1 }, function (res) {
        self.uploading = false
        if (res.data.success && res.data.file_path) {
          self.content = self.$utils.insertAtCaret(self.$refs['editor'], '\n![](' + res.data.file_path + ')\n')
        } else {
          self.$error(res.data)
        }
      })
    }
    if (this.defaultContent) {
      this.content = this.defaultContent
    }
  },
  methods: {
    // 清空编辑器内容
    clearEditor: function () {
      this.content = ''
    },

    // 浏览本地图片
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
    },

    // 如果是发布了文集则替换正文中的文章链接
    replaceLink: function () {
      if (this.type === 'essay' && this.data && this.data.title) {
        var title = '《' + this.data.title + '》'
        if (this.html.indexOf(title) >= 0) {
          this.html = this.html.replace(title, ' <a class="feed-link-essay" target="_blank" href="/essay/' + this.data.id + '">' + this.data.title + '</a>')
        } else {
          this.html += ' <a class="feed-link-essay" target="_blank" href="/essay/' + this.data.id + '">' + this.data.title + '</a>'
        }
      }
    },

    // 设置 n 级标题
    head: function (n) {
      var h = ''
      for (var i = 0; i < n; i++) {
        h += '#'
      }
      var arr = utils.getSurroundingSelection(this.$refs['editor'])
      var pos = utils.getInputSelection(this.$refs['editor'])['end']
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
        this.content = this.$refs['editor'].value = before + h + ' ' + str + arr[1] + arr[2]
      // 光标前是换行则直接插入 #n + 标题
      } else {
        this.content = this.$refs['editor'].value = arr[0] + h + ' ' + arr[1] + arr[2]
      }
      utils.setCaretPosition(this.$refs['editor'], pos + delta + n + 1)
    },

    // 设置无序列表
    ul: function () {
      var arr = utils.getSurroundingSelection(this.$refs['editor'])
      var pos = utils.getInputSelection(this.$refs['editor'])['end']
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
      this.content = this.$refs['editor'].value = content + arr[2]
      utils.setCaretPosition(this.$refs['editor'], pos + delta)
    },

    // 换行
    newline: function () {
      var arr = utils.getSurroundingSelection(this.$refs['editor'])
      var pos = utils.getInputSelection(this.$refs['editor'])['end']
      this.content = this.$refs['editor'].value = arr[0] + arr[1] + '  \n' + arr[2]
      utils.setCaretPosition(this.$refs['editor'], pos + 3)
    },

    // 代码块
    block: function () {
      var arr = utils.getSurroundingSelection(this.$refs['editor'])
      var pos = utils.getInputSelection(this.$refs['editor'])['start']
      this.content = this.$refs['editor'].value = arr[0] + '\n```\n' + arr[1] + '\n```' + arr[2]
      utils.setCaretPosition(this.$refs['editor'], pos + 5)
    },

    // 添加超链接
    link: function () {
      var arr = utils.getSurroundingSelection(this.$refs['editor'])
      var pos = utils.getInputSelection(this.$refs['editor'])['end']
      this.content = this.$refs['editor'].value = arr[0] + '[' + arr[1].replace(/\n/g, '') + '](link)' + arr[2]
      utils.setCaretPosition(this.$refs['editor'], pos + 7)
    },

    // 重新计算编辑器尺寸
    editorResize: function () {
      var self = this
      setTimeout(function () {
        self.$refs['editor'].style.height = 'auto'
        self.$refs['editor'].style.height = self.$refs['editor'].scrollHeight + 'px'
      }, 100)
    }
  },
  watch: {
    'content': {
      handler: function (val, oldVal) {
        this.html = marked(val)
        this.replaceLink()
        this.editorResize()
        typeof this.syncContent === 'function' && this.syncContent({
          type: 'md',
          content: this.content,
          html: this.html
        })
      }
    },
    'defaultContent': {
      handler: function (val, oldVal) {
        this.content = this.defaultContent
      }
    }
  }
}
</script>

<style lang="css">
@import '../assets/css/common.css';
@import '../assets/fonts/iconfont.css';

.mueditor {
  width: 100%;
  min-width: 20rem;
  box-shadow: 0 0 4px rgba(7, 40, 107, 0.2);
}

.mueditor .mueditor-toolbar {
  width: calc(100% - 2rem);
  padding: 0 1rem;
  height: 4rem;
  line-height: 4rem;
  background: #FFF;
  text-align: left;
  border-bottom: #EEE solid 1px;
}

.mueditor .mueditor-toolbar a {
  color: #AEAEAE;
  font-size: 0.875rem;
  border-bottom: none !important;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  -webkit-transition: all 0.45s ease-out 0s;
  -moz-transition: all 0.45s ease-out 0s;
  transition: all 0.45s ease-out 0s;
}

.mueditor .mueditor-toolbar a:hover {
  color: #333;
}

.mueditor .mueditor-toolbar i {
  font-style: normal !important;
}

.mueditor .mueditor-toolbar .tool {
  margin-left: 0.2rem;
  border-radius: 3px;
  padding: 0.3rem 0.5rem;
}

.mueditor .mueditor-toolbar .split {
  color: #EEE;
}

.mueditor .mueditor-toolbar .tool:hover {
  background: #EEE;
}

.mueditor .mueditor-toolbar .small i {
  font-size: 0.75rem;
}

.mueditor .mueditor-toolbar .upload-img {
  position: relative;
  margin-left: 0.5rem;
}

.mueditor .mueditor-toolbar .upload-img input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  display: block;
}

.mueditor .editor-content {
  width: 100%;
  background: #FFF;
}

.mueditor .editor-content textarea {
  outline: none;
  width: calc(100% - 4rem);
  min-height: 9rem;
  padding: 1rem 2rem;
  border: none;
  resize: none;
  font-size: 1rem;
  overflow: hidden;
  line-height: 1.5rem;
  font-family: monospace, monospace;
}

.mueditor .editor-control {
  width: 100%;
  padding: 1.5rem 0;
}

@media all and (max-width: 768px) {
  .mueditor-toolbar .h4,
  .mueditor-toolbar .h5,
  .mueditor-toolbar .h6,
  .mueditor-toolbar .block {
    display: none;
  }
}
</style>
