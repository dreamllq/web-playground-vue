<template>
  <el-select-v2 v-model='model' :options='ParamTypeList' />
</template>

<script setup lang="ts">
import { ParamType } from 'l-play-core';
import { ParamTypeList } from '../../../../constants/param-type';

const model = defineModel<ParamType>();
</script>

<style scoped>

</style>