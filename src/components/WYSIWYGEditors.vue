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
          :options="{ height: 150 }"
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
        :extensions="extensions"
        @ready="log('ready', $event)"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
      <div class="display-html" v-html="codemirrorHtml"></div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue';
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from '@codemirror/basic-setup'
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'app',
  components: {
    'editor': Editor,
    QuillEditor,
    Codemirror
  },
  setup() {
    const extensions = [html(), oneDark, basicSetup];
    return { extensions, log: console.log };
  },
  data() {
    return {
      tinymceHtml: localStorage.getItem('tinyMCEStored'),
      quilleditorHtml: localStorage.getItem('quillStored'),
      codemirrorHtml: localStorage.getItem('codemirrorStored'),
    };
  },
  updated() {
    localStorage.setItem('tinyMCEStored', this.tinymceHtml ?? '');
    localStorage.setItem('quillStored', this.quilleditorHtml ?? '');
    localStorage.setItem('codemirrorStored', this.codemirrorHtml ?? '');
  },
}
</script>
<style>
  .editor-wrapper p {
    margin-top: 20px;
  }
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