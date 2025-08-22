<template>
  <div>
    <!-- <value-type-select v-model='valueType' style='width: 150px' /> -->
    <el-form label-width='80px'>
      <el-form-item label='数据类型'>
        <div style='flex: 1'>
          <value-type-select v-model='valueType' />
        </div>
      </el-form-item>
    </el-form>
    <object-item-render v-model='objectItem' />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ValueTypeSelect from '../../value-type-select.vue';
import ObjectItemRender from '../object-item-render.vue';
import { ValueType } from '../../type';

type ListItem ={
  key: string,
  value: string,
  valueType: ValueType
}

const emits = defineEmits(['update:modelValue']);

const model = defineModel<ListItem>({
  default: () => ({
    key: '',
    value: '',
    valueType: 'string'
  }) 
});

const valueType = ref<ValueType>(model.value.valueType);
const objectItem = ref<{key: string, value: any}>({
  key: model.value.key,
  value: model.value.value
});

watch(model, () => {
  valueType.value = model.value.valueType;
  objectItem.value.key = model.value.key;
  objectItem.value.value = model.value.value;
}, { deep: true });

watch(valueType, () => {
  
  if (valueType.value === 'object') {
    objectItem.value.value = {};
  } else if (valueType.value === 'array') {
    objectItem.value.value = [];
  } else if (valueType.value === 'boolean') {
    objectItem.value.value = false;
  } else if (valueType.value === 'number') {
    objectItem.value.value = 0;
  } else if (valueType.value === 'string') {
    objectItem.value.value = '';
  }

  model.value.valueType = valueType.value;
  emits('update:modelValue', model.value);
});

watch(objectItem, () => {
  model.value.key = objectItem.value.key;
  model.value.value = objectItem.value.value;
  emits('update:modelValue', model.value);
  
}, { deep: true });

</script>

<style scoped>

</style>