

<template>
  <el-select-v2
    v-model='model'
    :options='LIFE_CYCLE_LIST'
    :disabled='disabled'
    filterable />
</template>

<script setup lang="ts">
import { LIFE_CYCLE_LIST } from '../../../../constants/life-cycle';

const model = defineModel({
  type: String,
  default: '' 
});

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

</script>

<style scoped>

</style>