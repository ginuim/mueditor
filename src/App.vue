<template>
  <div id="app">
    <h1 class="logo"></h1>
    <div class="publish-box">
      <Mueditor :sync-content="syncPreview" :default-content="defaultContent"></Mueditor>
      <div class="" v-html="html"></div>
    </div>
  </div>
</template>

<script>
import Mueditor from './components/Mueditor'

export default {
  name: 'app',
  components: {
    Mueditor
  },
  data: function () {
    return {
      defaultContent: '# Mueditor \n  A simple [Vue](http://vuejs.org)2.x markdown editor\n\n- simple\n- fast\n- lightweight',
      html: ''
    }
  },
  methods: {
    // 从发布框实时同步内容到模拟 FeedData
    syncPreview: function (data) {
      this.html = data.html
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  background-image: url('./assets/imgs/logo-pink.png');
  background-repeat: no-repeat;
  background-size: contain;
}
.publish-box {
  width: 40rem;
  margin: 0 auto;
}
@media all and (max-width: 768px) {
  .publish-box {
    width: 100%;
  }
}
</style>
