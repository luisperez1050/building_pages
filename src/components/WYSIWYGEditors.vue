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
    <div class="summernote">
      <p>Summernote</p>
      <div id="summernote"></div>
      <div class="display-html" v-html="summernoteHtml"></div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'summernote/dist/summernote.min.css';
import { summernote } from 'summernote';

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
      summernoteHtml: localStorage.getItem('summernoteStored'),
    };
  },
  mounted(){
    $("#summernote").summernote({
      height: 100,
      CodeMirrorConstructor: CodeMirror,
      theme: 'monokai',
      callbacks: {
        onChange: () => {
          this.checkHtml();
        }
      },
    });
    $("#summernote").summernote('pasteHTML', this.summernoteHtml);
  },
  updated() {
    localStorage.setItem('tinyMCEStored', this.tinymceHtml);
    localStorage.setItem('quillStored', this.quilleditorHtml);
    localStorage.setItem('summernoteStored', this.summernoteHtml);
  },
  methods: {
    checkHtml() {
      const html = $("#summernote").summernote('code');
      this.summernoteHtml = html;
    }
  },
}
</script>
<style>
  .tiny-mce,
  .quill,
  .summernote,
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