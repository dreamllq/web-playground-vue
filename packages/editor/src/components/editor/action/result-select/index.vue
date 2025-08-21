<template>
  <div class='result-select'>
    <result-type-select v-model='type' style='width: 150px' clearable />

    <variable-select 
      v-if='type'
      v-model='variable'
      style='width: 150px; margin-left: 8px;' />

    <el-input 
      v-if='type === ActionResultType.VARIABLE_VALUE'
      v-model='key'
      style='width: 150px; margin-left: 8px;' />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ResultTypeSelect from '../result-type-select/index.vue';
import { ActionResultType } from 'l-play-core';
import VariableSelect from '../../common/variable-select.vue';
import { ActionFormResult } from '../type';

const model = defineModel<ActionFormResult | undefined>({ default: () => ({}) });

const type = ref<ActionResultType | undefined>(model.value?.type);
const variable = ref<string | undefined>(model.value?.variable);
const key = ref<string | undefined>(model.value?.key);

watch(model, () => {
  type.value = model.value?.type;
  variable.value = model.value?.variable;
  key.value = model.value?.key;
});

watch(type, (val) => {
  model.value = model.value || {};
  model.value.type = val;
});

watch(variable, (val) => {
  model.value = model.value || {};
  model.value.variable = val;
});

watch(key, (val) => {
  model.value = model.value || {};
  model.value.key = val;
});
</script>

<style scoped lang="scss">
.result-select {
  display: flex;
  width: 100%;
}
</style>