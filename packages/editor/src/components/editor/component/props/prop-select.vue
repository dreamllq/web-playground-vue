<template>
  <div class='prop-select'>
    <el-input v-model='name' placeholder='参数名称' style='width: 150px;' />
    <prop-type-select v-model='propType' style='width: 150px; margin-left: 8px;' />

    <template v-if='propType === PropType.PROP'>
      <prop-value-type-select v-model='propValueType' style='width: 150px; margin-left: 8px;' />
      <el-input
        v-if='propValueType === PropValueType.VALUE'
        v-model='value'
        style='width: 150px; margin-left: 8px;'
        placeholder='值' 
      />

      <variable-select 
        v-if='propValueType === PropValueType.VARIABLE || propValueType === PropValueType.VARIABLE_VALUE'
        v-model='variable'
        style='width: 150px; margin-left: 8px;' />

      <el-input 
        v-if='propValueType === PropValueType.VARIABLE_VALUE'
        v-model='variableKey'
        placeholder='键'
        style='width: 150px; margin-left: 8px;' /> 

      <component-select 
        v-if='propValueType === PropValueType.SLOT_CONTEXT'
        v-model='component'
        style='width: 150px; margin-left: 8px;' />
      
      <el-input 
        v-if='propValueType === PropValueType.SLOT_CONTEXT'
        v-model='slotKey'
        placeholder='slot 键'
        style='width: 150px; margin-left: 8px;' />


      <action-select
        v-if='propValueType === PropValueType.FUNCTION'
        v-model='funcActions'
        style='width: 200px; margin-left: 8px;'
        multiple
        collapse-tags
        collapse-tags-tooltip />
      <variable-select 
        v-if='propValueType === PropValueType.FUNCTION' 
        v-model='funcReturn'
        style='width: 150px; margin-left: 8px;' />
    </template>

    <template v-if='propType === PropType.EVENT'>
      <action-select
        v-model='EventActions'
        style='width: 200px; margin-left: 8px;'
        multiple
        collapse-tags
        collapse-tags-tooltip />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PropTypeSelect from './prop-type-select.vue';
import { PropType, PropValueType } from 'l-play-core';
import ActionSelect from '../../common/action-select.vue';
import VariableSelect from '../../common/variable-select.vue';
import PropValueTypeSelect from './prop-value-type-select.vue';
import ComponentSelect from '../../common/component-select.vue';
import { PropsPropItem } from './type';

const model = defineModel<PropsPropItem>({ default: () => ({}) });

const name = ref<string>(model.value.name || '');
const propType = ref<PropType | undefined>(model.value.propType);
const propValueType = ref<PropValueType | undefined>(model.value.propValueType);
const value = ref<string | undefined>(model.value.value || '');
const variable = ref<string | undefined>(model.value.variable || '');
const variableKey = ref<string | undefined>(model.value.variableKey || '');
const component = ref<string | undefined>(model.value.component || '');
const slotKey = ref<string | undefined>(model.value.slotKey || '');
const funcActions = ref<string[]>(model.value.funcActions || []);
const funcReturn = ref<string | undefined>(model.value.funcReturn || '');

const EventActions = ref<string[]>(model.value.EventActions || []);

watch(model, () => {
  name.value = model.value.name;
  propType.value = model.value.propType;
  propValueType.value = model.value.propValueType;
  value.value = model.value.value;
  variable.value = model.value.variable;
  variableKey.value = model.value.variableKey;
  component.value = model.value.component;
  slotKey.value = model.value.slotKey;
  funcActions.value = model.value.funcActions || [];
  funcReturn.value = model.value.funcReturn;
  EventActions.value = model.value.EventActions || [];
});

watch(name, () => {
  model.value.name = name.value;
});

watch(propType, () => {
  model.value.propType = propType.value;
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

watch(EventActions, () => {
  model.value.EventActions = EventActions.value;
});

</script>

<style scoped lang="scss">
.prop-select{
  display: flex;
  width: 100%;
}
</style>