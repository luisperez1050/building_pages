<template>
  <div class="editor-wrapper">
    <div class="tiny-mce">
      <p>TinyMCE</p>
      <editor
        api-key="no-api-key"
        :init="{
          plugins: 'lists link image table code help wordcount'
        }"
      />
    </div>
    <div class="quill">
      <p>Quill</p>
      <QuillEditor theme="snow" />
    </div>
    <div class="summernote" @change="checkHtml()">
      <div id="summernote"></div>
      <button @click="checkHtml()">Check HTML</button>
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
      tinymceHtml: '',
      quilleditorHtml: '',
      summernoteHtml: '',
    };
  },
  mounted(){
    $("#summernote").summernote({
      height: 150,
      CodeMirrorConstructor: CodeMirror,
      theme: 'monokai',
      callbacks: {
        onChange: () => {
          this.checkHtml();
        }
      },
    });
    // add listener here and call checkthml
    $("#summernote").mouseleave( () => {
      console.log('hey');
    });
  },
  methods: {
    checkHtml() {
      const html = $("#summernote").summernote('code');
      console.log('html', html);
    }
  },
}
</script>
<style>
  .tiny-mce {
    margin-top: 20px;
  }
  .quill {
    margin-top: 20px;
  }
  .summernote {
    margin-top: 20px;
  }
</style>