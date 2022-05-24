import { ref } from 'vue'
import * as CodemirrorPackage from 'codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/htmlmixed/htmlmixed.js';

export function useTinyMCEOptions() {
    const dialogConfig =  {
        title: 'Pet Name Machine',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'catdata',
              label: 'enter the name of a cat'
            },
            {
              type: 'checkbox',
              name: 'isdog',
              label: 'tick if cat is actually a dog'
            }
          ]
        },
        buttons: [
          {
            type: 'cancel',
            name: 'closeButton',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'submitButton',
            text: 'Do Cat Thing',
            buttonType: 'primary'
          }
        ],
        initialData: {
          catdata: 'initial Cat',
          isdog: false
        },
        onSubmit: (api) => {
          const data = api.getData();
          const pet = data.isdog ? 'dog' : 'cat';
      
          tinymce.activeEditor.execCommand('mceInsertContent', false, `<p>My ${pet}'s name is: <strong>${data.catdata}</strong></p>`);
          api.close();
        }
    };
    const test1 = ref(false);
    const setup = (editor) => {
        // console.log('outside', this.test)
        // bad html
        // <p style="color: green; font-family: sans, "helvetica", arial;">test</p>
        console.log('setup cm',CodemirrorPackage);
        editor.ui.registry.addToggleButton('customStrikethrough', {
        text: 'Strikethrough',
        onAction: (api) => {
            test1.value = true;
        }
        });

        editor.ui.registry.addToggleButton('customToggleStrikethrough', {
            icon: 'strike-through',
            onAction: () => {
                test1.value = true;
                console.log('test1', test1.value)
                editor.windowManager.open({
                    title: 'Dialog Title', // The dialog's title - displayed in the dialog header
                    body: {
                      type: 'panel', // The root body type - a Panel or TabPanel
                      items: [ // A list of panel components
                        {
                          type: 'htmlpanel', // an HTML panel component
                          html: '<textarea id="indialog"></textarea>'
                        }
                      ]
                    },
                    size: 'large',
                    buttons: [ // A list of footer buttons
                      {
                        type: 'submit',
                        text: 'OK'
                      }
                    ],
                    onClose: () => {
                        console.log('closed')
                        test1.value = false;
                    }
                  });
                  CodemirrorPackage.fromTextArea(document.getElementById('indialog'), {
                        lineNumbers: true,
                        theme: 'monokai',
                        mode: 'htmlmixed',
                    });
                // editor.execCommand('mceToggleFormat', false, 'strikethrough'),
            }
        });
        editor.ui.registry.addButton('dialog-example-btn', {
            icon: 'code-sample',
            onAction: () => editor.windowManager.open(dialogConfig)
          })
    }
    return { setup, test1 }
}