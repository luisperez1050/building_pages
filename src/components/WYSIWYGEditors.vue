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
    <div class="summernote">
      <div id="summernote"></div>
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
import  * as summernote from 'summernote';


// $(".summernote").summernote({
//     height: 150,   //set editable area's height
//     codemirror: { // codemirror options
//       CodeMirrorConstructor: CodeMirror,
//       theme: 'monokai'
//     }
// });
export default {
  name: 'app',
  components: {
    'editor': Editor,
    QuillEditor
  },
  mounted(){
    console.log('mounted', summernote, jQuery, $);
    const test = $("#summernote").summernote();
    const html = test.summernote('code');
    console.log('test', test, html);
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