<template>
  <div class='editor-item-layout'>
    <div class='item-title'>
      {{ name }}
    </div>
    <div class='item-operator'>
      <slot name='operator' />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    default: ''
  }
});
</script>

<style scoped lang="scss">
.editor-item-layout{
  display: flex;
  padding: 4px 2px;
  border-bottom: 1px solid #ddd;
  align-items: center;

  .item-title{
    flex: 1;
    font-size: 12px;
    color: #333
  }

  .item-operator{
    flex: none
  }
}
</style>