<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='变量名' prop='name'>
      <el-input v-model='form.name' />
    </el-form-item>
    <el-form-item label='初始值' prop='value'>
      <!-- <el-input v-model='form.value' /> -->
      <div style='flex: 1'>
        <any-render v-model='form.value' />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import anyRender from '../common/json-schema-render/any-render.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{name: string, value: string}>,
    default: () => ({})
  }
});

const formRef = ref<FormInstance>();

const form = ref({
  name: props.defaultData.name || '',
  value: props.defaultData.value || ''
});

const rules = ref({
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