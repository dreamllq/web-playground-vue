<template>
  <div class='editor-area-layout'>
    <div class='layout-header'>
      <div class='header-title'>
        <slot name='title' />
      </div>
      <div class='header-operator'>
        <slot name='operator' />
      </div>
    </div>
    <div class='layout-main'>
      <div class='layout-main-inner'>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.editor-area-layout{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .layout-header{
    flex: none;
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 4px 2px;

    .header-title{
      flex: 1;
      overflow: hidden;
    }

    .header-operator{
      flex: none;
    }
  }

  .layout-main{
    flex: 1;
    overflow: hidden;

    .layout-main-inner{
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
}
</style>