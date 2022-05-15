<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>TinyMCE</p>
    <editor
      api-key="no-api-key"
      :init="{
        plugins: 'lists link image table code help wordcount'
      }"
    />
    <hr>
    <p>Quill</p>
    <QuillEditor theme="snow" />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'app',
  components: {
    'editor': Editor,
    QuillEditor
  }
}
</script>