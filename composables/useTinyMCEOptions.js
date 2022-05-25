import { ref } from 'vue'

export function useTinyMCEOptions() {
    const showCodeMirror = ref(false);
    const setup = (editor) => {
        // bad html
        // <p style="color: green; font-family: sans, "helvetica", arial;">test</p>
        editor.ui.registry.addToggleButton('codemirror', {
        text: 'CodeMirror',
        onAction: () => {
            showCodeMirror.value = true;
        }
        });
    }
    return { setup, showCodeMirror }
}