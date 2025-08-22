<template>
  <el-form label-width='80px'>
    <el-form-item label='key'>
      <div style='flex: 1'>
        <el-input v-model='key' placeholder='key' />
      </div>
    </el-form-item>
    <el-form-item label='value'>
      <div style='flex: 1'>
        <template v-if="valueType === 'string'">
          <string-render v-model='value' placeholder='value' />
        </template>
        <template v-else-if="valueType === 'number'">
          <number-render v-model='value' placeholder='value' />
        </template>
        <template v-else-if="valueType === 'boolean'">
          <bool-render v-model='value' placeholder='value' />
        </template>
        <template v-else-if="valueType === 'object'">
          <object-render v-model='value' placeholder='value' />
        </template>
        <template v-else>
          <span>暂不支持</span>
        </template>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import StringRender from '../string-render.vue';
import ObjectRender from './index.vue'; ;
import NumberRender from '../number-render.vue';
import BoolRender from '../bool-render.vue';
import { ValueType } from '../type';

type ObjectItem = {
  key: string;
  value: any;
}

const model = defineModel<ObjectItem>({
  default: () => ({
    key: '',
    value: '' 
  }) 
});

const key = ref<string>(model.value.key || '');
const value = ref<any>(model.value.value || '');
const valueType = ref<ValueType>(typeof value.value as ValueType);

watch(model, () => {
  key.value = model.value.key;
  value.value = model.value.value;
  valueType.value = typeof value.value;
}, { deep: true });

watch(key, () => {
  model.value.key = key.value;
});

watch(value, () => {
  model.value.value = value.value;
});

</script>

<style scoped>

</style>