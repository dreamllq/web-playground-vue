<template>
  <el-dialog
    v-model='dialogVisible'
    title='编辑行为参数'
    width='500'
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
import { ActionForm, ActionFormParam } from '../type';
import { ActionResultType, formatActionParamContext, formatActionParamValue, formatActionParamVariable, formatActionResultVariable, formatActionResultVariableValue, ParamType } from 'l-play-core';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{params: ActionFormParam[]}>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const action = playground.actions.find(action => action.id === id);
  if (!action) throw new Error('动作不存在');


  action.params = [];
  data.params.forEach(param => {
    if (param.type === ParamType.VARIABLE) {
      const variable = playground.variables.find(v => v.id === param.variable);
      if (!variable) throw new Error(`Variable ${param.variable} not found`);
      action.params.push(formatActionParamVariable(variable));
    } else if (param.type === ParamType.CONTEXT) {
      action.params.push(formatActionParamContext(param.context!));
    } else {
      action.params.push(formatActionParamValue(param.value!));
    }
  });

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const action = playground.actions.find(v => v.id === data.id);
  if (!action) throw new Error('操作不存在');

  const params = action.params.map(param => {
    if (param.type === ParamType.VARIABLE) {
      return {
        type: ParamType.VARIABLE,
        variable: param.value.id
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

  

  defaultData.value = { params };

  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>