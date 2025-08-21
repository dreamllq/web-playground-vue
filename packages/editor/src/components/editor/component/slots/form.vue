<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='插槽' prop='slots'>
      <slots-select v-model='form.slots' />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { SlotItem } from './type';
import SlotsSelect from './slots-select.vue';

const props = defineProps({
  defaultData: {
    type: Object,
    default: () => ({})
  }
});

const formRef = ref<FormInstance>();

const form = ref<{slots: SlotItem[]}>({ slots: props.defaultData.slots || [] });

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