<template>
  <div class="editor-wrapper">
    {{ validationMessage }}
    <div v-if="!showCodeMirror" class="tiny-mce">
      <p>TinyMCE</p>
      <Editor
        v-model="tinymceHtml"
        :initial-value="tinymceHtml"
        api-key="no-api-key"
        :init="{
          plugins: 'lists link image table code help wordcount autoresize',
          toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent codemirror',
          setup: setup
        }"
      />
      <div class="display-html" v-html="tinymceHtml"></div>
    </div>
    <CodeMirror v-if="showCodeMirror" :sourceHtml="tinymceHtml" @sourceCodeUpdate="updateTinyMCE">
      <button @click="() => showCodeMirror = false">Done</button>
    </CodeMirror>
    
    <div class="quill">
      <p>Quill</p>
      <div class="grid-wrapper">
        <QuillEditor 
          v-model:content="quilleditorHtml"
          :content="quilleditorHtml"
          :toolbar="quillToolBarOptions"
          :syntax="true"
          :options="{ height: 150 }"
          :modules="modules"
          contentType="html"
          theme="snow"
        />
      </div>
      <div class="display-html" v-html="quilleditorHtml"></div>
    </div>
    <div id="app">
        <ckeditor :editor="editor" v-model="editorData"></ckeditor>
    </div>
    <button @click="test()">test</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTinyMCEOptions } from '../../composables/useTinyMCEOptions.js'
import Editor from '@tinymce/tinymce-vue';
import CodeMirror from './CodeMirror.vue'
import { QuillEditor } from '@vueup/vue-quill';
import htmlEditButton from "quill-html-edit-button";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
  name: 'app',
  components: {
    Editor,
    QuillEditor,
    CodeMirror,
  },
  setup() {
    const modules = {
      name: 'htmlEditButton',  
      module: htmlEditButton, 
    }
    const test = ref(false);
    const { setup, showCodeMirror } = useTinyMCEOptions();

    return { modules, setup, test, showCodeMirror };
  },
  data() {
    return {
      tinymceHtml: localStorage.getItem('tinyMCEStored'),
      quilleditorHtml: localStorage.getItem('quillStored'),
      codemirrorHtml: localStorage.getItem('codemirrorStored'),
      cmHtml: localStorage.getItem('cmStored'),
      editor: ClassicEditor,
      editorData: localStorage.getItem('editorStored') ?? '',
      validationMessage: null,
      bad: '<p style="font-family: hans, "arial", helvitica;">test</p>'
    };
  },
  updated() {
    localStorage.setItem('tinyMCEStored', this.tinymceHtml ?? '');
    localStorage.setItem('quillStored', this.quilleditorHtml ?? '');
    localStorage.setItem('codemirrorStored', this.codemirrorHtml ?? '');
    localStorage.setItem('cmStored', this.cmHtml ?? '');
    localStorage.setItem('editorStored', this.editorData ?? '');
  },
  computed: {
    quillToolBarOptions() {
      return [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block', 'code'],

        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];
    },
  },
  methods: {
    updateTinyMCE(updatedHtml) {
      this.tinymceHtml = updatedHtml;
    },
    test() {
      fetch('https://luis-nitro-app-default.layer0-limelight.link/api/validation', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body : this.bad
      })
      .then((res) => res.json())
      .then( (response) => {
        this.validationMessage = response;
      });
    }
  },
}
</script>
<style>
  .editor-wrapper p {
    margin-top: 20px;
  }
  .editor-wrapper p,
  .editor-wrapper button {
    grid-column: 1 / -1;
  }
  .editor-wrapper button {
    width: 60px;
  }
  .tiny-mce,
  .quill,
  .codemirror {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 8px 20px;
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