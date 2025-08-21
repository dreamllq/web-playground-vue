<template>
  <el-select-v2
    v-model='model'
    :options='options'
    :multiple='multiple'
    :collapse-tags='collapseTags' 
    :collapse-tags-tooltip='collapseTagsTooltip' 
    placeholder='选择组件' />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store';

defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  collapseTags: {
    type: Boolean,
    default: false
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: false
  }
});

const { playground } = useStore()!;
const model = defineModel<string | string[]>();

const options = ref<{value: string, label: string}[]>(playground.components.map(item => ({
  value: item.id,
  label: `${item.name}-${item.$class}`
})));
</script>

<style scoped>

</style>