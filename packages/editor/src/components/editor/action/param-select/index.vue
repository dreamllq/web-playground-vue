<template>
  <div class='param-select'>
    <param-type-select v-model='type' style='width: 100px;' />

    <variable-select 
      v-if='type === ParamType.VARIABLE'
      v-model='variable'
      style='width: 150px; margin-left: 8px;' />

    <el-input 
      v-if='type === ParamType.VALUE'
      v-model='value'
      style='width: 150px; margin-left: 8px;' />

    <el-input
      v-if='type === ParamType.CONTEXT'
      v-model='context'
      type='number'
      style='width: 150px; margin-left: 8px;' />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ParamTypeSelect from '../param-type-select/index.vue';
import { ParamType } from 'l-play-core';
import VariableSelect from '../../common/variable-select.vue';
import { ActionFormParam } from '../type';

const model = defineModel<ActionFormParam>({ default: () => ({ type: ParamType.VARIABLE }) });

const type = ref<ParamType>(model.value.type);
const variable = ref<string | undefined>(model.value.variable);
const value = ref<string | undefined>(model.value.value);
const context = ref<number | undefined>(model.value.context);

watch(model, () => {
  type.value = model.value.type;
  variable.value = model.value.variable;
  value.value = model.value.value;
  context.value = model.value.context;
});


watch(type, () => {
  model.value.type = type.value!;
});

watch(variable, () => {
  model.value.variable = variable.value;
});

watch(value, () => {
  model.value.value = value.value;
});

watch(context, () => {
  model.value.context = context.value;
});

</script>

<style scoped lang="scss">
.param-select{
  display: flex;
  width: 100%
}
</style>