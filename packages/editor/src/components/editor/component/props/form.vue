<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='参数' prop='props'>
      <props-select v-model='form.props' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { PropsPropItem } from './type';
import PropsSelect from './props-select.vue';

const props = defineProps({
  defaultData: {
    type: Object,
    default: () => ({})
  }
});

const formRef = ref<FormInstance>();

const form = ref<{props: PropsPropItem[]}>({ props: props.defaultData.props || [] });

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