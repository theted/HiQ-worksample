<template lang="pug">
  .result.animated.zoomIn
    pre {{ content}}
    .close(@click="close") x

</template>

<script>
  export default {
    name: 'result',
    props: ['content'],
    methods: {
      close() {
        this.$destroy() // destroy the vue listeners, etc
        this.$el.parentNode.removeChild(this.$el) // remove the element from the DOM
      }
    }
  }

</script>

<style src="./Result.styl" lang="stylus"></style>
