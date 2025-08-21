<template>
  <el-select-v2 v-model='model' :options='PropTypeList' />
</template>

<script setup lang="ts">
import { PropType } from 'l-play-core';
import { PropTypeList } from '../../../../constants/prop-type';

const model = defineModel<PropType>();
</script>

<style scoped>

</style>