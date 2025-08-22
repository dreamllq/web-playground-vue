<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='组件' prop='component'>
      <component-select v-model='form.component' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import ComponentSelect from '../common/component-select/index.vue';

const formRef = ref<FormInstance>();

const form = ref({ component: '' });

const rules = ref({
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