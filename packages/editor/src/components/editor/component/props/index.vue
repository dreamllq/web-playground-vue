<template>
  <el-dialog
    v-model='dialogVisible'
    :title='title'
    width='1000'
    append-to-body
  >
    <biz-form v-if='dialogVisible' ref='formRef' :default-data='defaultData' />

    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='dialogVisible = false'>
          取消
        </el-button>
        <el-button type='primary' @click='onSubmit'>
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useStore } from '../../../store';
import { ref } from 'vue';
import BizForm from './form.vue';
import { formatPropsEvent, formatPropsPropFunction, formatPropsPropSlotContext, formatPropsPropValue, formatPropsPropVariable, formatPropsPropVariableValue, PropType, PropValueType } from 'l-play-core';
import { PropsPropItem } from './type';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref({});
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();
const title = ref('');

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');
  component.props = {};
  data.props.forEach(prop => {
    if (prop.propType === PropType.PROP) {
      if (prop.propValueType === PropValueType.VARIABLE) {
        const variable = playground.variables.find(v => v.id === prop.variable);
        if (!variable) throw new Error(`变量${prop.variable}不存在`);
        component.props[prop.name] = formatPropsPropVariable(variable);
      } else if (prop.propValueType === PropValueType.VARIABLE_VALUE) {
        const variable = playground.variables.find(v => v.id === prop.variable);
        if (!variable) throw new Error(`变量${prop.variable}不存在`);
        component.props[prop.name] = formatPropsPropVariableValue(variable, prop.variableKey!);
      } else if (prop.propValueType === PropValueType.VALUE) {
        component.props[prop.name] = formatPropsPropValue(prop.value);
      } else if (prop.propValueType === PropValueType.SLOT_CONTEXT) {
        const slotComponent = playground.components.find(c => c.id === prop.component);
        if (!slotComponent) throw new Error(`组件${prop.component}不存在`);
        component.props[prop.name] = formatPropsPropSlotContext(slotComponent, prop.slotKey!);
      } else {
        const actions = prop.funcActions!.map(actionId => {
          const action = playground.actions.find(v => v.id === actionId);
          if (!action) throw new Error('动作不存在');
          return action;
        });
        const funcReturn = playground.variables.find(v => v.id === prop.funcReturn);
        component.props[prop.name] = formatPropsPropFunction(actions, funcReturn);
      }


    } else {
      const actions = prop.EventActions!.map(actionId => {
        const action = playground.actions.find(v => v.id === actionId);
        if (!action) throw new Error('动作不存在');
        return action;
      });

      component.props[prop.name] = formatPropsEvent(actions);
    }
  });
  
  

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');

  title.value = `编辑组件props-${component.name}`;

  const props: PropsPropItem[] = Object.entries(component.props).map(([name, item]) => {
    if (item.type === PropType.PROP) {
      if (item.value.type === PropValueType.VARIABLE) {
        return {
          name,
          propType: item.type,
          propValueType: item.value.type,
          variable: item.value.value.id
        };
      } else if (item.value.type === PropValueType.VARIABLE_VALUE) {
        return {
          name,
          propType: item.type,
          propValueType: item.value.type,
          variable: item.value.value.id,
          variableKey: item.value.key
        };
      } else if (item.value.type === PropValueType.VALUE) {
        return {
          name,
          propType: item.type,
          propValueType: item.value.type,
          value: item.value.value
        };
      } else if (item.value.type === PropValueType.SLOT_CONTEXT) {
        return {
          name,
          propType: item.type,
          propValueType: item.value.type,
          component: item.value.component.id,
          slotKey: item.value.key
        };
      } else {
        return {
          name,
          propType: item.type,
          propValueType: item.value.type,
          funcActions: Array.isArray(item.value.value) ? item.value.value.map(item => item.id) : [item.value.value.id],
          funcReturn: item.value.return ? item.value.return.id : undefined
        };
      }

    } else {
      return {
        name,
        propType: item.type,
        EventActions: Array.isArray(item.value) ? item.value.map(v => v.id) : [item.value.id]
      };
    }
  });
  defaultData.value = { props };
  
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>