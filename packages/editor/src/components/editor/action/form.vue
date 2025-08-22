<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='行为名' prop='name'>
      <el-input v-model='form.name' />
    </el-form-item>
    <el-form-item label='行为选择' prop='action'>
      <register-action-select v-model='form.action' :disabled='disabledProps.includes("action")' />
    </el-form-item>
    <el-form-item label='结果' prop='result'>
      <result-select v-model='form.result' />
    </el-form-item>
    <el-form-item label='异步' prop='async'>
      <el-switch v-model='form.async' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import RegisterActionSelect from './register-action-select.vue';
import ResultSelect from './result-select/index.vue';
import { ActionForm } from './type';

const props = defineProps({
  defaultData: {
    type: Object as PropType<ActionForm>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref<ActionForm>({
  action: props.defaultData.action || '',
  name: props.defaultData.name || '',
  result: props.defaultData.result || {},
  async: props.defaultData.async || false
});

const rules = ref({
  action: {
    required: true,
    message: '必填'
  },
  name: {
    required: true,
    message: '必填'
  }
});

const getData = async () => {
  let valid = await formRef.value!.validate();
  if (valid) {
    return cloneDeep(form.value);
  } else {
    throw new Error();
  }
};

defineExpose({ getData });
</script>

<style scoped>

</style>