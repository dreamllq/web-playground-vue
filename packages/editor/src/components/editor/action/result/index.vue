<template>
  <el-dialog
    v-model='dialogVisible'
    title='编辑行为结果'
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
import { ActionForm, ActionFormResult } from '../type';
import { ActionResultType, formatActionParamContext, formatActionParamValue, formatActionParamVariable, formatActionResultVariable, formatActionResultVariableValue, ParamType } from 'l-play-core';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{result: ActionFormResult}>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const action = playground.actions.find(action => action.id === id);
  if (!action) throw new Error('动作不存在');

  if (data.result?.type) {
    const variable = playground.variables.find(v => v.id === data.result!.variable);
    if (!variable) throw new Error(`Variable ${data.result.variable} not found`);
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
  const action = playground.actions.find(v => v.id === data.id);
  if (!action) throw new Error('操作不存在');

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

  defaultData.value = { result };

  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>