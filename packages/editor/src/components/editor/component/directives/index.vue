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
import { DirectiveValue, formatPropsEvent, formatPropsPropFunction, formatPropsPropSlotContext, formatPropsPropValue, formatPropsPropVariable, formatPropsPropVariableValue, PropType, PropValueSlotContext, PropValueType, PropValueValue, PropValueVariable, PropValueVariableValue } from 'l-play-core';
import { DirectiveItem } from '../type';
import { PropsPropValueForm } from '../props/type';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{directives: DirectiveItem[]}>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();
const title = ref('');

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');
  component.props = {};
  console.log(data);

  const directives:Record<string, DirectiveValue> = {};
  if (Array.isArray(data.directives)) {
    data.directives.forEach(directive => {
      if (directive.value.propValueType === PropValueType.VARIABLE) {
        const variable = playground.variables.find(v => v.id === directive.value.variable);
        if (!variable) throw new Error(`变量${directive.value.variable}不存在`);
        directives[directive.name] = new DirectiveValue(new PropValueVariable(variable), directive.arg, directive.modifiers);
      } else if (directive.value.propValueType === PropValueType.VARIABLE_VALUE) {
        const variable = playground.variables.find(v => v.id === directive.value.variable);
        if (!variable) throw new Error(`变量${directive.value.variable}不存在`);
        directives[directive.name] = new DirectiveValue(new PropValueVariableValue(variable, directive.value.variableKey!), directive.arg, directive.modifiers);
      } else if (directive.value.propValueType === PropValueType.VALUE) {
        directives[directive.name] = new DirectiveValue(new PropValueValue(directive.value.value), directive.arg, directive.modifiers);
      } else if (directive.value.propValueType === PropValueType.SLOT_CONTEXT) {
        const component = playground.components.find(c => c.id === directive.value.component);
        if (!component) throw new Error(`组件${directive.value.component}不存在`);
        directives[directive.name] = new DirectiveValue(new PropValueSlotContext(component, directive.value.slotKey!), directive.arg, directive.modifiers);
      } else {
        console.warn('不支持的参数类型');
      }
    });
  }
  
  component.directives = directives;
  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');

  title.value = `编辑组件指令-${component.name}`;

  const directives: DirectiveItem[] = [];
  Object.entries(component.directives).forEach(([name, directive]) => {
    let value:PropsPropValueForm;
    if (directive.value.type === PropValueType.VARIABLE) {
      value = {
        propValueType: directive.value.type,
        variable: directive.value.value.id
      };
    } else if (directive.value.type === PropValueType.VARIABLE_VALUE) {
      value = {
        propValueType: directive.value.type,
        variable: directive.value.value.id,
        variableKey: directive.value.key
      };
    } else if (directive.value.type === PropValueType.VALUE) {
      value = {
        propValueType: directive.value.type,
        value: directive.value.value
      };
    } else if (directive.value.type === PropValueType.SLOT_CONTEXT) {
      value = {
        propValueType: directive.value.type,
        component: directive.value.component.id,
        slotKey: directive.value.key
      };
    } else {
      value = {
        propValueType: directive.value.type,
        funcActions: Array.isArray(directive.value.value) ? directive.value.value.map(item => item.id) : [directive.value.value.id],
        funcReturn: directive.value.return ? directive.value.return.id : undefined
      };
    }

    const d = {
      name: name,
      value: value,
      arg: directive.arg,
      modifiers: directive.modifiers
    };

    directives.push(d);
  });
  defaultData.value = { directives };
  
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>