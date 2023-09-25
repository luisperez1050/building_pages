<script>
const newTest = '<WYSIWYGEditors />'
// this is how we can take stringified vue files and build them on the fly
import { compile, h } from 'vue/dist/vue.esm-bundler'

export default {
    // components: { Test, WYSIWYGEditors },
    // template object acheives the same as setup compile
    // template: newTest,
    setup() {
        return compile(newTest);
    },
}
</script>
