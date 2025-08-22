<template>
  <div>
    <el-form label-width='80px'>
      <el-form-item label='数据类型'>
        <div style='flex: 1'>
          <value-type-select v-model='valueType' />
        </div>
      </el-form-item>
      <el-form-item label='value'>
        <div style='flex: 1'>
          <template v-if="valueType === 'string'">
            <string-render v-model='model' placeholder='value' />
          </template>
          <template v-else-if="valueType === 'number'">
            <number-render v-model='model' placeholder='value' />
          </template>
          <template v-else-if="valueType === 'boolean'">
            <bool-render v-model='model' placeholder='value' />
          </template>
          <template v-else-if="valueType === 'object'">
            <object-render v-model='model' placeholder='value' />
          </template>
          <template v-else>
            <span>暂不支持</span>
          </template>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ValueTypeSelect from './value-type-select.vue';
import { ValueType } from './type';
import StringRender from './string-render.vue';
import ObjectRender from './object-render/index.vue';
import NumberRender from './number-render.vue';
import BoolRender from './bool-render.vue';


const model = defineModel<any>({ default: '' });
console.log(model.value);
console.log(model.value);


const valueType = ref<ValueType>(typeof model.value as ValueType);

watch(model, () => {
  valueType.value = typeof model.value as ValueType;
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
  }
});

</script>

<style scoped>

</style>