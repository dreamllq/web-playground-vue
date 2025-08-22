<template>
  <el-form label-width='100px' style='width: 100%'>
    <el-form-item label='prop值类型'>
      <prop-value-type-select v-model='propValueType' />
    </el-form-item>
        
    <el-form-item v-if='propValueType === PropValueType.VALUE' label='值'>
      <div style='flex: 1'>
        <any-render v-model='value' />
      </div>
    </el-form-item>

    <el-form-item v-if='propValueType === PropValueType.VARIABLE || propValueType === PropValueType.VARIABLE_VALUE' label='变量'>
      <variable-select 
        v-model='variable'
      />
    </el-form-item>

    <el-form-item v-if='propValueType === PropValueType.VARIABLE_VALUE' label='变量-键'>
      <el-input 
        v-model='variableKey'
        placeholder='键'
      /> 
    </el-form-item>
        
    <el-form-item v-if='propValueType === PropValueType.SLOT_CONTEXT' label='父组件'>
      <component-select 
        v-model='component'
      />
    </el-form-item>

    <el-form-item v-if='propValueType === PropValueType.SLOT_CONTEXT' label='slot 键'>
      <el-input 
        v-model='slotKey'
        placeholder='slot 键'
      />
    </el-form-item>

    <el-form-item v-if='propValueType === PropValueType.FUNCTION' label='方法行为集'>
      <action-select
        v-model='funcActions'
        multiple />
    </el-form-item>

    <el-form-item v-if='propValueType === PropValueType.FUNCTION' label='方法返回变量'>
      <variable-select 
        v-model='funcReturn'
      />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { PropType, PropValueType } from 'l-play-core';
import ActionSelect from '../../common/action-select/index.vue';
import VariableSelect from '../../common/variable-select.vue';
import PropValueTypeSelect from './prop-value-type-select.vue';
import ComponentSelect from '../../common/component-select/index.vue';
import { PropsPropItem, PropsPropValueForm } from './type';
import AnyRender from '../../common/json-schema-render/any-render.vue';

const model = defineModel<PropsPropValueForm>({ default: () => ({}) });

const propValueType = ref<PropValueType | undefined>(model.value.propValueType);
const value = ref<string | undefined>(model.value.value);
const variable = ref<string | undefined>(model.value.variable || '');
const variableKey = ref<string | undefined>(model.value.variableKey || '');
const component = ref<string | undefined>(model.value.component || '');
const slotKey = ref<string | undefined>(model.value.slotKey || '');
const funcActions = ref<string[]>(model.value.funcActions || []);
const funcReturn = ref<string | undefined>(model.value.funcReturn || '');

watch(model, () => {
  propValueType.value = model.value.propValueType;
  value.value = model.value.value;
  variable.value = model.value.variable;
  variableKey.value = model.value.variableKey;
  component.value = model.value.component;
  slotKey.value = model.value.slotKey;
  funcActions.value = model.value.funcActions || [];
  funcReturn.value = model.value.funcReturn;
});

watch(propValueType, () => {
  model.value.propValueType = propValueType.value;
});

watch(value, () => {
  model.value.value = value.value;
});

watch(variable, () => {
  model.value.variable = variable.value;
});

watch(variableKey, () => {
  model.value.variableKey = variableKey.value;
});

watch(component, () => {
  model.value.component = component.value;
});

watch(slotKey, () => {
  model.value.slotKey = slotKey.value;
});

watch(funcActions, () => {
  model.value.funcActions = funcActions.value;
});

watch(funcReturn, () => {
  model.value.funcReturn = funcReturn.value;
});

</script>

<style scoped>

</style>