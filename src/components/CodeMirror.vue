<template>
    <div class="codemirror">
      <p>Codemirror</p>
      <textarea v-model="sourceHtml" id="codemirror" ></textarea>
      <div class="display-html" v-html="sourceHtml"></div>
      <slot />
    </div>
</template>
<script>
import * as codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
export default{
  // async setup() {
  //   const codemirror = await import('codemirror');
  //   console.log('setup', codemirror)
  //   // import 'codemirror/lib/codemirror.css';
  //   // import 'codemirror/theme/monokai.css';
  //   // import 'codemirror/mode/htmlmixed/htmlmixed.js';
  //   return { codemirror };
  // },
  emits: ['sourceCodeUpdate'],
  props: {
    sourceHtml: {
      required: true,
    }
  },
  mounted() {
    const editor = codemirror.fromTextArea(document.getElementById('codemirror'), {
      lineNumbers: true,
      theme: 'monokai',
      mode: 'htmlmixed',
    });
    editor.on('changes', () => {
      const html = editor.getValue();
      this.$emit('sourceCodeUpdate', html);
    })
  },
}
</script>
<style>
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
</style>