<template>
  <div>
    <el-button
      v-if='model.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>
    <template v-for='(item, index) in model' :key='index'>
      <param-item
        :model-value='item'
        :show-add='index === model.length - 1'
        @change='(val) => onChange(index, val)'
        @add='onAdd'
        @delete='onDelete(index)' />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ParamType } from 'l-play-core';
import ParamItem from './item.vue';
import { Plus } from '@element-plus/icons-vue';
import { ActionFormParam } from '../type';

const model = defineModel<ActionFormParam[]>({ default: () => [] });

const onChange = (index:number, value: ActionFormParam) => {
  model.value[index] = value;
};

const onAdd = () => {
  model.value.push({ type: ParamType.VARIABLE });
};

const onDelete = (index:number) => {
  model.value = model.value.filter((_, i) => i !== index);
};

</script>

<style scoped>

</style>