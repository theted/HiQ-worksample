<template src="./App.pug" lang="pug"></template>

<script>

import Vue from 'vue'
import FileUpload from '../file-upload/file-upload.vue'
import Result from '../Result/Result.vue'

export default {
  name: 'app',
  components: {
    FileUpload,
    Result
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    uploadEvent (content) {
      this.items.push({ content })
    }
  }
}
</script>

<style src="./App.styl" lang="stylus"></style>
<style src="../../style/style.styl" lang="stylus"></style>
