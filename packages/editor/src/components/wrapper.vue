<template>
  <div class='playground-editor'>
    <div class='editor-wrapper'>
      <editor />
    </div>

    <div class='preview'>
      <preview />
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from './editor/index.vue';
import { useStore } from './store';
import Preview from './preview/index.vue';

const { playground } = useStore()!;

defineExpose({ api: () => ({ toJSON: () => playground.toJSON() }) });
</script>

<style scoped lang="scss">
.playground-editor {
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #ddd;
  box-sizing: border-box;

  .editor-wrapper{
    flex: none;
    width: 50%;
    height: 100%;
    border-right: 1px solid #ddd;
  }
  .preview{
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
}
</style>