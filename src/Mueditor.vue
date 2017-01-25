<template>
  <div class="mueditor">
    <div class="mueditor-toolbar clearfix">
      <!-- Heading -->
      <tool-heading
        v-for="i in headings"
        :step="i"
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-content="setContent"
        >
      </tool-heading>
      <!-- Bold -->
      <tool-bold
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        >
      </tool-bold>
      <!-- Italic -->
      <tool-italic
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        >
      </tool-italic>
      <!-- Unordered list -->
      <tool-unordered-list
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-content="setContent"
        >
      </tool-unordered-list>
      <!-- New line -->
      <tool-enter
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-content="setContent"
        >
      </tool-enter>
      <!-- Block quote -->
      <tool-block-quote
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        >
      </tool-block-quote>
      <!-- Code block -->
      <tool-code-block
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        >
      </tool-code-block>
      <!-- Hyper link -->
      <tool-link
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        >
      </tool-link>
      <span class="split">|</span>
      <!-- Upload image -->
      <tool-image
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        :insert-at-caret="insertAtCaret"
        >
      </tool-image>
      <span class="split">|</span>
      <!-- Help -->
      <tool-help
        :selection="selection"
        :caret-pos="caretPos"
        :set-caret-position="setCaretPosition"
        :set-text-selected="setTextSelected"
        :set-content="setContent"
        :insert-at-caret="insertAtCaret"
        >
      </tool-help>
    </div>
    <div class="editor-content">
      <textarea ref="editor"
        @click="textareActive"
        @keydown="textareActive"
        v-model="content"
        >
      </textarea>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import utils from './utils/utils'
import ToolHeading from './components/toolbar/Heading.vue'
import ToolBold from './components/toolbar/Bold.vue'
import ToolItalic from './components/toolbar/Italic.vue'
import ToolCodeBlock from './components/toolbar/CodeBlock.vue'
import ToolBlockQuote from './components/toolbar/Blockquote.vue'
import ToolImage from './components/toolbar/Image.vue'
import ToolLink from './components/toolbar/Link.vue'
import ToolEnter from './components/toolbar/Enter.vue'
import ToolOrderList from './components/toolbar/OrderList.vue'
import ToolUnorderedList from './components/toolbar/UnorderedList.vue'
import ToolTable from './components/toolbar/Table.vue'
import ToolHelp from './components/toolbar/Help.vue'
export default {
  props: [
    'callback',
    'syncContent',
    'defaultContent',
    'localStorageName',
    'autoHeight'
  ],
  components: {
    ToolHeading,
    ToolBold,
    ToolItalic,
    ToolCodeBlock,
    ToolBlockQuote,
    ToolImage,
    ToolLink,
    ToolEnter,
    ToolOrderList,
    ToolUnorderedList,
    ToolTable,
    ToolHelp
  },
  data: function () {
    return {
      selection: [],
      caretPos: { start: 0, end: 0 },
      headings: [1, 2, 3, 4, 5, 6],
      html: '',
      content: '',
      uploading: false
    }
  },
  mounted: function () {
    // var self = this
    // this.uploading = false
    // this.fileReader = new window.FileReader()
    // this.fileReader.onload = function (event) {
    //   self.$post('zhijia/file/upload/base64', { filefield: event.target.result, flag: 1 }, function (res) {
    //     self.uploading = false
    //     if (res.data.success && res.data.file_path) {
    //       self.content = self.$utils.insertAtCaret(self.$refs['editor'], '\n![](' + res.data.file_path + ')\n')
    //     } else {
    //       self.$error(res.data)
    //     }
    //   })
    // }
    if (this.localStorageName && window.localStorage.getItem(this.localStorageName)) {
      this.content = window.localStorage.getItem(this.localStorageName)
    } else if (this.defaultContent) {
      this.content = this.defaultContent
    }
  },
  methods: {
    name: 'Mueditor',
    // 清空编辑器内容
    clearEditor: function () {
      this.content = ''
    },

    // // 浏览本地图片
    // browserFile: function () {
    //   try {
    //     this.file = this.$refs.file.files[0]
    //     if (!this.file.type.match(/image\/.*/i)) {
    //       this.$error('不支持的文件格式')
    //       return
    //     }
    //     this.uploading = true
    //     this.fileReader.readAsDataURL(this.file)
    //   } catch (err) {
    //   }
    // },

    // 当文本框被激活时
    textareActive: function () {
      this.selection = utils.getSurroundingSelection(this.$refs['editor'])
      this.caretPos = utils.getInputSelection(this.$refs['editor'])
    },

    // 设置文本框内容
    setContent: function (content) {
      this.content = this.$refs['editor'].value = content
    },

    // 在光标处插入
    insertAtCaret: function (content) {
      this.$utils.insertAtCaret(this.$refs['editor'], content)
    },

    // 设定光标位置
    setCaretPosition: function (pos) {
      utils.setCaretPosition(this.$refs['editor'], pos)
    },

    // 选中文本框文字
    setTextSelected: function (start, end) {
      utils.setTextSelected(this.$refs['editor'], start, end)
    },

    // 重新计算编辑器尺寸
    editorResize: function () {
      var self = this
      setTimeout(function () {
        self.$refs['editor'].style.height = 'auto'
        self.$refs['editor'].style.height = self.$refs['editor'].scrollHeight + 'px'
      }, 100)
    },

    // 自动保存
    autoSave: function () {
      if (this.localStorageName) {
        window.localStorage.setItem(this.localStorageName, this.content)
      }
    }
  },
  watch: {
    'content': {
      handler: function (val, oldVal) {
        this.html = marked(val)
        this.editorResize()
        this.autoSave()
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
@import './assets/css/common.css';
@import './assets/fonts/iconfont.css';

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
  float: left;
  color: #AEAEAE;
  font-size: 0.875rem;
  border-bottom: none !important;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  -webkit-transition: all 0.45s ease-out 0s;
  -moz-transition: all 0.45s ease-out 0s;
  transition: all 0.45s ease-out 0s;
  margin-left: 0.2rem;
  border-radius: 3px;
  /*padding: 0.3rem 0.5rem;*/
  width: 2rem;
  height: 1.5rem;
  line-height: 1.5rem;
  display: inline-block;
  text-align: center;
  margin-top: 1.25rem;
}

.mueditor .mueditor-toolbar a:hover {
  color: #333;
  background: #EEE;
}

.mueditor .mueditor-toolbar i {
  font-style: normal !important;
}

.mueditor .mueditor-toolbar .split {
  float: left;
  margin-top: 1.25rem;
  line-height: 1.75rem;
  color: #EEE;
}

.mueditor .mueditor-toolbar .upload-img {
  position: relative;
  margin: 1.25rem 0.5rem 0 0.5rem;
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
