<template>
  <root :playground='playground'>
    <wrapper />
  </root>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import Root from './root.vue';
import Wrapper from './wrapper.vue';
import { Playground } from '../models/playground';

defineProps({
  playground: {
    type: Object as PropType<Playground>,
    required: true
  }
});
</script>

<style scoped>

</style>