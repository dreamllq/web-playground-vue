<template>
  <el-input
    v-model='val'
    type='number' 
    :placeholder='placeholder' />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const model = defineModel<number>();
const val = ref(model.value);
watch(val, () => {
  model.value = Number(val.value);
});

defineProps({
  placeholder: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>

</style>