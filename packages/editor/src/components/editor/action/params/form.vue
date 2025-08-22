<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='参数' prop='params'>
      <params-select v-model='form.params' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import ParamsSelect from '../params-select/index.vue';
import { ActionForm, ActionFormParam } from '../type';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{params: ActionFormParam[]}>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref<{params: ActionFormParam[]}>({ params: props.defaultData.params || [] });

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