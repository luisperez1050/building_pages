<script setup>
import { ref, computed } from 'vue';
const show = ref(false)
const showEditors = () => { show.value = !show.value }
const buttonText = computed(() => {
  return show.value ? 'Hide Editors' : 'Show Editors'
})
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <PageHeader msg="Build pages" />
        <button @click="showEditors()">{{ buttonText }}</button>
      </div>
    </header>

    <main>
      <ContentEditor />
    </main>
  </div>
</template>

<style>

#app {
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {

  header {
    display: flex;
    place-items: center;
    justify-content: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
