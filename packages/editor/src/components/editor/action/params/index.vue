<template>
  <el-dialog
    v-model='dialogVisible'
    :title='title'
    width='1000'
    append-to-body
  >
    <biz-form
      v-if='dialogVisible'
      ref='formRef'
      :default-data='defaultData' />

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
import { ActionForm, ActionFormParam, ActionFormResult } from '../type';
import { ActionResultType, formatActionParamContext, formatActionParamValue, formatActionParamVariable, formatActionParamVariableValue, formatActionResultVariable, formatActionResultVariableValue, ParamType } from 'l-play-core';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{params: ActionFormParam[], result: ActionFormResult}>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();

const title = ref('');

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const action = playground.getActionById(id);

  action.params = [];
  data.params.forEach(param => {
    if (param.type === ParamType.VARIABLE) {
      const variable = playground.getVariableById(param.variable!);
      action.params.push(formatActionParamVariable(variable));
    } else if (param.type === ParamType.VARIABLE_VALUE) {
      const variable = playground.getVariableById(param.variable!);
      action.params.push(formatActionParamVariableValue(variable, param.key!));
    } else if (param.type === ParamType.CONTEXT) {
      action.params.push(formatActionParamContext(param.context!));
    } else {
      action.params.push(formatActionParamValue(param.value!));
    }
  });

  if (data.result?.type) {
    const variable = playground.getVariableById(data.result.variable!);
    if (data.result.type === ActionResultType.VARIABLE) {
      action.result = formatActionResultVariable(variable);
    } else {
      action.result = formatActionResultVariableValue(variable, data.result.key!);
    }
  }

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const action = playground.getActionById(data.id);
  
  title.value = `编辑行为参数&结果-${action.name}-${action.$class}`;

  const params = action.params.map(param => {
    if (param.type === ParamType.VARIABLE) {
      return {
        type: ParamType.VARIABLE,
        variable: param.value.id
      };
    } else if (param.type === ParamType.VARIABLE_VALUE) {
      return {
        type: ParamType.VARIABLE_VALUE,
        variable: param.value.id,
        key: param.key
      };
    } else if (param.type === ParamType.CONTEXT) {
      return {
        type: ParamType.CONTEXT,
        context: param.value
      };
    } else {
      return {
        type: ParamType.VALUE,
        value: param.value
      };
    }
  });

  let result: ActionFormResult = {};
  if (action.result) {
    if (action.result.type === ActionResultType.VARIABLE) {
      result = {
        type: ActionResultType.VARIABLE,
        variable: action.result.value.id
      };
    } else {
      result = {
        type: ActionResultType.VARIABLE_VALUE,
        variable: action.result.value.id,
        key: action.result.key
      };
    }
  } 

  

  defaultData.value = {
    params,
    result 
  };

  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>