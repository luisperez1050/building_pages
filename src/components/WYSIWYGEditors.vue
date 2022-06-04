<template>
  <div class="editor-wrapper">
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
    {{def}}
    <label>
      Select an editor to validate
      <VueSelect
        v-model="def"
        :options="[
          {label: 'TinyMCE', local: 'tinyMCEStored'},
          {label: 'Quill', local: 'quillStored'},
          {label: 'CkEditor', local: 'editorStored'},
        ]"
        :reduce="label => label.local"
      >

      </VueSelect>
    </label>
    <button @click="test()">test</button>
    <pre v-if="invalid">{{ htmlErrors }}</pre>
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';


export default {
  name: 'app',
  components: {
    Editor,
    QuillEditor,
    CodeMirror,
    vSelect,
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
      invalid: false,
      htmlErrors: null,
      def: 'test',
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
      //nuxt http://0.0.0.0/api/validation
      // express https://luis-express-endpoints-default.layer0-limelight.link/validate
      fetch('https://luis-express-endpoints-default.layer0-limelight.link/validate', {
        method: 'post',
        body : '<p>test</p><p>'
      })
      .then((res) => res.json())
      .then( (response) => {
        this.invalid = !response.valid;
        this.htmlErrors = response.errors;
      });
    },
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
  pre {
    background-color: rgb(229, 116, 116);
    border-radius: 6px;
    color: black;
    margin-top: 10px;
    padding: 5px 10px;
    overflow: auto;
  }
  .v-select { width: 25%; }
  .tox-notifications-container {
    display: none;
  }
  .ql-container {
    height: 100px;
  }
</style>