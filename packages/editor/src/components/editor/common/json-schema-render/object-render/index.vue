<template>
  <any-object-render v-model='model' />
</template>

<script setup lang="ts">
import AnyObjectRender from './any-object-render/index.vue';
const model = defineModel<Record<string, any>>();

</script>

<style scoped>

</style>