<template>
  <div class="editor-wrapper">
    <div class="tiny-mce">
      <p>TinyMCE</p>
      <editor
        v-model="tinymceHtml"
        :initial-value="tinymceHtml"
        api-key="no-api-key"
        :init="{
          plugins: 'lists link image table code help wordcount'
        }"
      />
      <div class="display-html" v-html="tinymceHtml"></div>
    </div>
    <div class="quill">
      <p>Quill</p>
      <QuillEditor 
        v-model:content="quilleditorHtml"
        :content="quilleditorHtml"
        :options="{ height: 150 }"
        contentType="html"
        theme="snow"
      />
      <div class="display-html" v-html="quilleditorHtml"></div>
    </div>
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
  },
  data() {
    return {
      tinymceHtml: localStorage.getItem('tinyMCEStored'),
      quilleditorHtml: localStorage.getItem('quillStored'),
    };
  },
  updated() {
    localStorage.setItem('tinyMCEStored', this.tinymceHtml ?? '');
    localStorage.setItem('quillStored', this.quilleditorHtml ?? '');
  },
}
</script>
<style>
  .tiny-mce,
  .quill,
  .display-html {
    margin-top: 20px;
  }
  .display-html {
    background-color: var(--vt-c-black-mute);
    border: 1px solid hsla(160, 100%, 37%, 1);
    border-radius: 4px;
    box-shadow: 0px 0px 6px hsla(160, 100%, 37%, 1);
    color: var(--vt-c-white-soft);
    padding: 5px 8px;
  }
  .tox-notifications-container {
    display: none;
  }
  .ql-container {
    height: 100px;
  }
</style>