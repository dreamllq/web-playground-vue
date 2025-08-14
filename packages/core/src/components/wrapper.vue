<template>
  <playground-render :playground='playground' />
</template>

<script setup lang="ts">
import { useStore } from './store';
import PlaygroundRender from './renders/playground-render.tsx';

const { playground } = useStore()!;

console.log(playground);

</script>

<style scoped>

</style>