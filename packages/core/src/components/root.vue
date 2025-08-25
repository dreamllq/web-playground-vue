<template>
  <slot />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useProvideStore } from './store';
import { Playground } from '../models/playground';

const props = defineProps({
  playground: {
    type: Object as PropType<Playground>,
    required: true
  }
});

useProvideStore(props.playground);
</script>

<style scoped>

</style>