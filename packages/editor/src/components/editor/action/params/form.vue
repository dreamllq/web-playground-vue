<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='参数' prop='params'>
      <div style='width: 100%;'>
        <params-select v-model='form.params' />
      </div>
    </el-form-item>
    <el-form-item label='结果' prop='result'>
      <result-select v-model='form.result' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import ParamsSelect from '../params-select/index.vue';
import { ActionForm, ActionFormParam, ActionFormResult } from '../type';
import ResultSelect from '../result-select/index.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{params: ActionFormParam[], result: ActionFormResult}>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref<{params: ActionFormParam[], result: ActionFormResult}>({
  params: props.defaultData.params || [],
  result: props.defaultData.result || {} 
});

const rules = ref({});

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