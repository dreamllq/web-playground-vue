<template>
  <el-select-v2
    v-model='model'
    :options='options' 
    placeholder='选择变量' />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store';

const { playground } = useStore()!;
const model = defineModel<string>('model');

const options = ref<{value: string, label: string}[]>(playground.variables.map(item => ({
  value: item.id,
  label: item.name
})));
</script>

<style scoped>

</style>