<template>
  <el-input
    v-model='model'
    type='number' 
    :placeholder='placeholder' />
</template>

<script setup lang="ts">
const model = defineModel<number>();

defineProps({
  placeholder: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>

</style>