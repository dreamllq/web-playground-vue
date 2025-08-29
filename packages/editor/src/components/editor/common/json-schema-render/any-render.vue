<template>
  <div>
    <form-item label='数据类型'>
      <div style='flex: 1'>
        <value-type-select v-model='valueType' />
      </div>
    </form-item>
    <form-item v-if='valueType !== "null"' label='value'>
      <div style='flex: 1'>
        <json-schema-render v-model='model' :render='render' :schema='{type: valueType, additionalProperties: true}' />
      </div>
    </form-item>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import ValueTypeSelect from './value-type-select.vue';
import { ValueType } from './type';
import { getValueType } from './utils/get-value-type';
import JsonSchemaRender from './json-schema-render.vue';
import { JSONSchema7 } from 'json-schema';
import FormItem from './common/form-item.vue';

const props = defineProps({
  render: {
    type: Object,
    default: undefined
  }
});
const model = defineModel<any>({ default: '' });

const valueType = ref<ValueType>(getValueType(model.value) as ValueType);

watch(model, () => {
  valueType.value = getValueType(model.value) as ValueType;
});

watch(valueType, () => {
  if (valueType.value === 'object') {
    model.value = {};
  } else if (valueType.value === 'array') {
    model.value = [];
  } else if (valueType.value === 'boolean') {
    model.value = false;
  } else if (valueType.value === 'number') {
    model.value = 0;
  } else if (valueType.value === 'string') {
    model.value = '';
  } else if (valueType.value === 'null') {
    model.value = null;
  }
});

</script>

<style scoped>

</style>