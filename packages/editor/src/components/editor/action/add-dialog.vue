<template>
  <el-dialog
    v-model='dialogVisible'
    title='新增行为'
    width='1000'
    append-to-body
  >
    <biz-form v-if='dialogVisible' ref='formRef' />
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
import { ref } from 'vue';
import BizForm from './form.vue';
import { useStore } from '../../store';
import { ActionResultType, formatActionParamContext, formatActionParamValue, formatActionParamVariable, formatActionResultVariable, formatActionResultVariableValue, ParamType } from 'l-play-core';

const { playground, register } = useStore()!;
const dialogVisible = ref(false);
const formRef = ref<InstanceType<typeof BizForm>>();

const emits = defineEmits(['success']);

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const ActionT = register.actionRegister.map.get(data.action);
  if (!ActionT) throw new Error(`Action ${data.action} not found`);
  const action = playground.action(ActionT, data.name);
  action.async = data.async;

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

const show = () => {
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>