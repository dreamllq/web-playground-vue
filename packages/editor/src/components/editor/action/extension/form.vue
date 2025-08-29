<template>
  <el-form
    ref='formRef'
    :model='form'
    :rules='rules'
    label-position='top'>
    <el-form-item label='扩展参数' prop='extension'>
      <div style='flex: 1'>
        <json-schema-render v-model='form.extension' :schema='schema' :render='{PlayGroundComponentSelect:PlayGroundComponentSelect}' />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { cloneDeep } from 'lodash';
import JsonSchemaRender from '../../common/json-schema-render/index.vue';
import PlayGroundComponentSelect from '../../common/component-select/index.vue';

const props = defineProps({
  defaultData: {
    type: Object as PropType<{extension: Record<string, any>}>,
    default: () => ({})
  },
  disabledProps: {
    type: Array,
    default: () => []
  },
  schema: {
    type: Object,
    default: undefined
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