<template>
  <div class='editor-main'>
    <div class='edit-area-item'>
      <div class='edit-col'>
        <div class='edit-row'>
          <variable-area />
        </div>
        <div class='edit-row end'>
          <action-area />
        </div>
      </div>
    </div>
    <div class='edit-area-item'>
      <component-area />
    </div>
    <div class='edit-area-item end'>
      <tree-area />
    </div>
  </div>
</template>

<script setup lang="ts">
import VariableArea from './variable/index.vue';
import ActionArea from './action/index.vue';
import ComponentArea from './component/index.vue';
import TreeArea from './tree/index.vue';
</script>

<style scoped lang="scss">
.editor-main{
  height: 100%;
  width: 100%;
  display: flex;

  .edit-area-item{
    flex: none;
    width: 25%;
    border-right: 1px solid #ddd;
    overflow: hidden;

    &.end{
      flex: 1;
      width: auto;
      border-right: 0;
    }
  }

  .edit-col{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    
    .edit-row{
      flex: none;
      height: 50%;
      overflow: hidden;
      border-bottom: 1px solid #ddd;

      &.end {
        flex: 1;
        height: auto;
        border-bottom: 0;
      }
    }
  }
}
</style>