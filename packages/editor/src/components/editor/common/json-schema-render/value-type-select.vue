<template>
  <el-select-v2 v-model='model' :options='options' @change='onChange' />
</template>

<script setup lang="ts">
const model = defineModel<'string'|'number'|'boolean'|'object'|'array'>();
if (!model.value) {
  model.value = 'string';
}

const emit = defineEmits(['change']);

const onChange = () => {
  emit('change', model.value);
};

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