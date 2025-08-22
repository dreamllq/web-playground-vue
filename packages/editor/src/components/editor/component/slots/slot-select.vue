<template>
  <div class='slot-select'>
    <el-form label-width='80px' style='width:100%;'>
      <el-form-item label='插槽名'>
        <el-input
          v-model='name' 
          placeholder='插槽名' />
      </el-form-item>
      
      <el-form-item label='组件'>
        <component-select
          v-model='components'
          multiple />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { SlotItem } from './type';
import ComponentSelect from '../../common/component-select/index.vue';

const model = defineModel<SlotItem>({ default: () => ({}) });

const name = ref<string>(model.value.name || '');
const components = ref<string[]>(model.value.components || []);

watch(model, () => {
  name.value = model.value.name || '';
  components.value = model.value.components || [];
});

watch(name, () => {
  model.value.name = name.value;
});

watch(components, () => {
  model.value.components = components.value;
});
</script>

<style scoped lang="scss">
.slot-select{
  display: flex;
  width: 100%;
}
</style>