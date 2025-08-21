<template>
  <el-select-v2 v-model='model' :options='ActionResultTypeList' :clearable='clearable' />
</template>

<script setup lang="ts">
import { ActionResultType } from 'l-play-core';
import { ActionResultTypeList } from '../../../../constants/action-result-type';

const props = defineProps({
  clearable: {
    type: Boolean,
    default: false
  }
});

const model = defineModel<ActionResultType>();
</script>

<style scoped>

</style>