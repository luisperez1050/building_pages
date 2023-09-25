<template>
  <div>
      <p>
          prop {{ item }}
      </p>
      <p>
          data {{ test }}
      </p>
  </div>
</template>

<script>
export default {
    props: {
        item: {
            type: String,
        }
    },
    data() {
        return {
            test: 'Comes from data'
        };
    }
}
</script>

<style>

</style>