<template>
  <div class='param-select'>
    <el-form label-width='80px' style='width: 100%'>
      <el-form-item label='参数类型'>
        <param-type-select v-model='type' />
      </el-form-item>

      <el-form-item v-if='type === ParamType.VARIABLE' label='变量'>
        <variable-select 
          v-model='variable'
        />
      </el-form-item>

      <el-form-item v-if='type === ParamType.VALUE' label='值'>
        <div style='flex: 1;'>
          <any-render v-model='value' />
        </div>
      </el-form-item>

      <el-form-item v-if='type === ParamType.CONTEXT' label='入参索引'>
        <el-input
          v-model='context'
          type='number'
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ParamTypeSelect from '../param-type-select/index.vue';
import { ParamType } from 'l-play-core';
import VariableSelect from '../../common/variable-select.vue';
import { ActionFormParam } from '../type';
import AnyRender from '../../common/json-schema-render/any-render.vue';

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