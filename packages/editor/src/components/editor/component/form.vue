<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules' 
    label-position='top'>
    <el-form-item label='组件名' prop='name'>
      <el-input v-model='form.name' />
    </el-form-item>
    <el-form-item label='组件' prop='component'>
      <register-component-select v-model='form.component' :disabled='disabledProps.includes("component")' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { ComponentForm } from './type';
import RegisterComponentSelect from './register-component-select.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<ComponentForm>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref({
  name: props.defaultData.name || '',
  component: props.defaultData.component || ''
});

const rules = ref({
  name: {
    required: true,
    message: '必填'
  },
  component: {
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