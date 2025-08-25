<template>
  <slot />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useProvideStore } from './store';
import { PlaygroundJSON } from 'l-play-core';
import { ProvideOptions } from '../types/editor';

const props = defineProps({
  json: {
    type: Object as PropType<PlaygroundJSON>,
    default: undefined
  },
  options: {
    type: Object as PropType<ProvideOptions>,
    default: undefined
  }
});

useProvideStore(props.json, props.options);

</script>

<style scoped>

</style>