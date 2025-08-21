<template>
  <root :json='json' :options='options'>
    <wrapper ref='wrapperRef' />
  </root>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import Root from './root.vue';
import Wrapper from './wrapper.vue';
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
const wrapperRef = ref<InstanceType<typeof Wrapper>>();

defineExpose({ api: () => wrapperRef.value!.api() });
</script>

<style scoped>

</style>