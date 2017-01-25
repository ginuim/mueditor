# Mueditor
A ***simple*** [Vue](http://vuejs.org)2.x **markdown** editor

- fast
- simple
- lightweight

## install

> npm install mueditor

## how to use

```
<template>
  <div class="publish-box">
      <Mueditor
        :sync-content="syncPreview"
        :default-content="defaultContent"
        local-storage-name="mue"
        >
      </Mueditor>
      <div class="publish-preview" v-html="html"></div>
    </div>
</template>

<script>
import Mueditor from './Mueditor'
export default {
  components: {
    Mueditor
  },
  data: function () {
    return {
      defaultContent: 'Mueditor demo',
      html: ''
    }
  },
  methods: {
    syncPreview: function (data) {
      this.html = data.html
    }
  }
}
</script>
```
