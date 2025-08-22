<template>
  <!-- <div style='display: inline-block;'>
    <el-input v-model='key' style='width: 150px;' placeholder='key' />
    <template v-if="valueType === 'string'">
      <string-render v-model='value' style='width: 150px;padding-left: 8px;' placeholder='value' />
    </template>
    <template v-else>
      <span>暂不支持</span>
    </template>
  </div> -->
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
        <template v-else-if="valueType === 'object'">
          <any-object-render v-model='value' placeholder='value' />
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
import AnyObjectRender from './any-object-render/index.vue';

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
const valueType = ref<string>(typeof value.value);

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