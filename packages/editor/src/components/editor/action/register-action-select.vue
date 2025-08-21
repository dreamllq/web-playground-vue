<template>
  <el-select-v2 v-model='model' :options='options' :disabled='disabled' />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store';

const model = defineModel({
  type: String,
  default: '' 
});

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const { register } = useStore()!;
const options = ref<{value: string; label: string}[]>([]);
register.actionRegister.map.forEach((value, key) => {
  options.value.push({
    value: key,
    label: key 
  });
});
</script>

<style scoped>

</style>