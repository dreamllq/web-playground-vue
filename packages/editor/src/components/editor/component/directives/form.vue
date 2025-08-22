<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules' 
    label-position='top'>
    <el-form-item label='指令' prop='directives'>
      <div style='flex: 1'>
        <directives-select v-model='form.directives' />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import { DirectiveItem } from '../type';
import DirectivesSelect from './directives-select.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{directives: DirectiveItem[]}>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref({ directives: props.defaultData.directives || [] });

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