<template>
  <el-select-v2 v-model='model' :options='PropValueTypeList' />
</template>

<script setup lang="ts">
import { PropValueType } from 'l-play-core';
import { PropValueTypeList } from '../../../../constants/prop-value-type';

const model = defineModel<PropValueType>();
</script>

<style scoped>

</style>