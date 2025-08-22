<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='扩展参数' prop='extension'>
      <div style='flex: 1'>
        <object-render v-model='form.extension' />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import ObjectRender from '../../common/json-schema-render/object-render/index.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{extension: Record<string, any>}>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  }
});

const formRef = ref<FormInstance>();

const form = ref<{extension: Record<string, any>}>({ extension: props.defaultData.extension || {} });

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