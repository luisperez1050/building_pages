// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['QuillEditor'].includes(tag)
    },
  },

})
