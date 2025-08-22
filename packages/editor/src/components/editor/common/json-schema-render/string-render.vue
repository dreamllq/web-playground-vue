<template>
  <el-input
    v-model='model' 
    type='textarea'
    :placeholder='placeholder' />
</template>

<script setup lang="ts">
const model = defineModel<string>({ default: '' });

defineProps({
  placeholder: {
    type: String,
    default: ''
  }
});
</script>

<style scoped>

</style>