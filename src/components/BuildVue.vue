<template>
    <div>before</div>
</template>
<script>
const badhtml = '<p class="test" style="color: red; font-family: sans, "arial", helvetica">bad html</p>';
const goodHtml = '<p>can you see this</p>'
// this is how we can take stringified vue files and build them on the fly
import { compile, h } from 'vue/dist/vue.esm-bundler'

export default {
    setup() {
        return compile(goodHtml);
    },
}
</script>
