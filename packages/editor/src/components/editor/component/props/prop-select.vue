<template>
  <div class='prop-select'>
    <el-form label-width='100px' style='width: 100%'>
      <el-form-item label='参数名称'>
        <el-input v-model='name' placeholder='参数名称' />
      </el-form-item>
      <el-form-item label='参数类型'>
        <prop-type-select v-model='propType' />
      </el-form-item>

      <template v-if='propType === PropType.PROP'> 
        <prop-value-select v-model='propValueData' />
      </template>
      <template v-if='propType === PropType.EVENT'>
        <el-form-item label='事件行为集'>
          <action-select
            v-model='eventActions'
            multiple />
        </el-form-item>
        <el-form-item label='回调参数'>
          <div style='flex: 1'>
            <event-callback-params-select v-model='callbackParams' />
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PropTypeSelect from './prop-type-select.vue';
import { PropType, PropValueType } from 'l-play-core';
import ActionSelect from '../../common/action-select/index.vue';
import { PropsPropItem, PropsPropValueForm } from './type';
import PropValueSelect from './prop-value-select.vue';
import EventCallbackParamsSelect from './event-callback-params-select.vue';

const model = defineModel<PropsPropItem>({ default: () => ({}) });
const propValueData = ref<PropsPropValueForm>({
  propValueType: model.value.propValueType,
  value: model.value.value,
  variable: model.value.variable,
  variableKey: model.value.variableKey,
  component: model.value.component,
  slotKey: model.value.slotKey,
  funcActions: model.value.funcActions || [],
  funcReturn: model.value.funcReturn
});

const name = ref<string>(model.value.name || '');
const propType = ref<PropType | undefined>(model.value.propType);

const eventActions = ref<string[]>(model.value.eventActions || []);
const callbackParams = ref<PropsPropValueForm[]>(model.value.callbackParams || []);

watch(model, () => {
  name.value = model.value.name;
  propType.value = model.value.propType;
  eventActions.value = model.value.eventActions || [];
  propValueData.value.propValueType = model.value.propValueType;
  propValueData.value.value = model.value.value;
  propValueData.value.variable = model.value.variable;
  propValueData.value.variableKey = model.value.variableKey;
  propValueData.value.component = model.value.component;
  propValueData.value.slotKey = model.value.slotKey;
  propValueData.value.funcActions = model.value.funcActions || [];
  propValueData.value.funcReturn = model.value.funcReturn;
});


watch(name, () => {
  model.value.name = name.value;
});

watch(propType, () => {
  model.value.propType = propType.value;
});

watch(propValueData, () => {
  model.value.propValueType = propValueData.value.propValueType;
  model.value.value = propValueData.value.value;
  model.value.variable = propValueData.value.variable;
  model.value.variableKey = propValueData.value.variableKey;
  model.value.component = propValueData.value.component;
  model.value.slotKey = propValueData.value.slotKey;
  model.value.funcActions = propValueData.value.funcActions;
  model.value.funcReturn = propValueData.value.funcReturn;
}, { deep: true });

watch(eventActions, () => {
  model.value.eventActions = eventActions.value;
}, { deep: true });

watch(callbackParams, () => {
  model.value.callbackParams = callbackParams.value;
}, { deep: true });

</script>

<style scoped lang="scss">
.prop-select{
  display: flex;
  width: 100%;
}
</style>