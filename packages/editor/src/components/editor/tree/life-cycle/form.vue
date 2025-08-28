<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='生命周期' prop='lifeCycle'>
      <life-cycle-select v-model='form.lifeCycle' :disabled='disabledProps.includes("lifeCycle")' />
    </el-form-item>
    <el-form-item label='行为集' prop='actions'>
      <div style='flex: 1'>
        <action-select v-model='form.actions' multiple />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import LifeCycleSelect from './life-cycle-select.vue';
import { LifeCycle } from 'l-play-core';
import ActionSelect from '../../common/action-select/index.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{lifeCycle: LifeCycle, actions: string[]}>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref({
  lifeCycle: props.defaultData.lifeCycle || '',
  actions: props.defaultData.actions || []
});

const rules = ref({
  lifeCycle: {
    required: true,
    message: '必填'
  },
  actions: {
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