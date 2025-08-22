<template>
  <el-select-v2 v-model='model' :options='options' />
</template>

<script setup lang="ts">
const model = defineModel<'string'|'number'|'boolean'|'object'|'array'>();
if (!model.value) {
  model.value = 'string';
}

const options = [
  {
    value: 'string',
    label: '字符串'
  },
  {
    value: 'number',
    label: '数字'
  },
  {
    value: 'boolean',
    label: '布尔'
  },
  {
    value: 'object',
    label: '对象'
  },
  {
    value: 'array',
    label: '数组'
  }
];
</script>

<style scoped>

</style>