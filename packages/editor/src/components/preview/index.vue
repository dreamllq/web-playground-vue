<template>
  <area-layout>
    <template #title>
      预览
    </template>
    <template #operator>
      <el-button type='primary' link @click='onRefresh'>
        <el-icon><refresh /></el-icon>
      </el-button>
    </template>
    <playground-render v-if='ready' :playground='playground' />
  </area-layout>
</template>

<script setup lang="ts">
import AreaLayout from '../editor/layout/area-layout.vue';
import { Refresh } from '@element-plus/icons-vue';
import { Playground, PlaygroundRender } from 'l-play-core';
import { useStore } from '../store';
import { nextTick, ref } from 'vue';

const { playground } = useStore()!;
const ready = ref(false);
const onRefresh = async () => {
  ready.value = false;

  await nextTick();
  ready.value = true;
};
</script>

<style scoped>

</style>