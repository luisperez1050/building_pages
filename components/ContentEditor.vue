<template>
  <div class="editor-wrapper">
    <ClientOnly>
      <quill-editor
        v-model:content="htmlEditor"
        :toolbar="toolBarOptions"
        :syntax="true"
        :options="{ height: 150 }"
        :modules="modules"
        contentType="html"
        theme="snow"
      />
    </ClientOnly>
    <p>Quill</p>
    <div class="grid-wrapper">
    </div>
    <div class="display-html" v-html="htmlEditor"></div>

    <pre v-if="invalid">{{ htmlErrors }}</pre>
  </div>
</template>

<script>

export default {
  name: 'app',
  async setup() {
    if (!process.server) {
      const { htmlEditButton } = await import("quill-html-edit-button");
      const modules = {
        name: 'htmlEditButton',  
        module: htmlEditButton, 
      };
      console.log('-=-=-=-=-=', htmlEditButton);

      return { modules };
    }
  },
  data() {
    return {
      htmlEditor: null,
      invalid: false,
      htmlErrors: null,
    };
  },
  mounted() {
    this.htmlEditor = localStorage.getItem('quillStored')
  },
  updated() {
    localStorage.setItem('quillStored', this.htmlEditor ?? '');
  },
  computed: {
    toolBarOptions() {
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
  },
}
</script>
<style scoped>
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