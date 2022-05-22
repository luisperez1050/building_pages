<template>
  <div class="editor-wrapper">
    <p>TinyMCE</p>
    <div class="tiny-mce">
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
    <p>Quill</p>
    <div class="quill">
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
    <p>Codemirror</p>
    <div class="codemirror">
      <codemirror
        v-model="codemirrorHtml"
        placeholder="Code goes here..."
        :style="{ height: '400px' }"
        :indent-with-tab="true"
        :tabSize="2"
        :options="codemirrorOptions"

        @ready="log('ready', $event)"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
      <div class="display-html" v-html="codemirrorHtml"></div>
    </div>
    <p>Codemirror package</p>
    <div class="codemirror">
      <textarea v-model="cmHtml" id="cmpackage" ></textarea>
      <!-- <div class="display-html" v-html="cmHtml"></div> -->
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { Codemirror } from 'vue-codemirror'
import * as CodemirrorPackage from 'codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from '@codemirror/basic-setup'
import { linter } from '@codemirror/lint'
import { QuillEditor } from '@vueup/vue-quill';
import htmlEditButton from "quill-html-edit-button";
import '@vueup/vue-quill/dist/vue-quill.snow.css';

console.log('lint', linter);

export default {
  name: 'app',
  components: {
    'editor': Editor,
    QuillEditor,
    Codemirror
  },
  setup() {
    const extensions = [ oneDark];
    const modules = {
      name: 'htmlEditButton',  
      module: htmlEditButton, 
      // options: { syntax: true }
    }
    return { extensions, log: console.log, modules };
  },
  data() {
    return {
      tinymceHtml: localStorage.getItem('tinyMCEStored'),
      quilleditorHtml: localStorage.getItem('quillStored'),
      codemirrorHtml: localStorage.getItem('codemirrorStored'),
      cmHtml: localStorage.getItem('cmStored'),
      codemirrorOptions: {
        mode: 'text/html',
        htmlMode: true,
        lineNumbers: true,
        theme: 'monokai'
      },
    };
  },
  updated() {
    localStorage.setItem('tinyMCEStored', this.tinymceHtml ?? '');
    localStorage.setItem('quillStored', this.quilleditorHtml ?? '');
    localStorage.setItem('codemirrorStored', this.codemirrorHtml ?? '');
    localStorage.setItem('cmStored', this.cmHtml ?? '');
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
  mounted() {
    CodemirrorPackage.fromTextArea(document.getElementById('cmpackage'), {
      lineNumbers: true,
      theme: 'monokai',
      mode: 'htmlmixed',
    });
  },
}
</script>
<style>
  .editor-wrapper p {
    margin-top: 20px;
  }
  .ͼ4 .cm-line { caret-color: unset !important;}
  .tiny-mce,
  .quill,
  .codemirror {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 20px;
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