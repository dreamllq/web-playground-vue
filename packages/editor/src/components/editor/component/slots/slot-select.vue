<template>
  <div class='slot-select'>
    <el-input
      v-model='name' 
      style='width: 150px;'
      placeholder='插槽名' />
    <component-select
      v-model='component'
      style='width: 150px; margin-left: 8px;' />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { SlotItem } from './type';
import ComponentSelect from '../../common/component-select.vue';

const model = defineModel<SlotItem>({ default: () => ({}) });

const name = ref<string>(model.value.name || '');
const component = ref<string>(model.value.component || '');

watch(model, () => {
  name.value = model.value.name;
  component.value = model.value.component;
});

watch(name, () => {
  model.value.name = name.value;
});

watch(component, () => {
  model.value.component = component.value;
});
</script>

<style scoped lang="scss">
.slot-select{
  display: flex;
}
</style>