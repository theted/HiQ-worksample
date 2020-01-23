<template src="./file-upload.pug" lang="pug"></template>

<script>

  import Vue from 'vue'
  import { upload } from '../../services/file-upload.js';   // real service

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
  const ALLOWED_MIMES = [
    'application/json',
    'text/plaintext'
  ]

  export default {
    name: 'file-upload',
    components: {},
    data() {
      return {
        data: '',
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'data',
        count: 0,
        dragging: false
      }
    },
    computed: {
      isInitial() { return this.currentStatus === STATUS_INITIAL},
      isSaving() { return this.currentStatus === STATUS_SAVING},
      isSuccess() { return this.currentStatus === STATUS_SUCCESS},
      isFailed() { return this.currentStatus === STATUS_FAILED }
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },

      save(formData) {
        this.currentStatus = STATUS_SAVING;

        upload(formData) // upload file using upload service
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
            console.log('UPLOAD EVENT:', x)
            this.data = x.data
            this.$emit('upload', x.data)

            // create element or stuff
            console.log(x.datas)

            this.reset()
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
            console.log('UPLOAD ERROR')
            console.log(err)
          })
      },
      filesChange(fieldName, fileList) {
        const formData = new FormData()

        if (!fileList.length) return

        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name)
          })

        this.save(formData)
      }
    },
    mounted() {
      this.reset()
    },
  }

</script>

<style src="./file-upload.styl" lang="stylus"></style>
