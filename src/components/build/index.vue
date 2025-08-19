<template>
  <div>
    <div style='height: 600px; border: 1px solid;'>
      <playground-render v-if='playground' :playground='playground' />
    </div>
    <div>
      <el-input v-model='json' type='textarea' />
    </div>
    <div>
      <el-button @click='onBuild'>
        build
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useRegister } from './use-register';
import { Playground, PlaygroundRender } from 'l-play-core';

const { fromJSON } = useRegister();

const json = ref('');
const playground = ref<Playground | null>();

const onBuild = async() => {
  playground.value = null;
  await nextTick();
  const data = JSON.parse(json.value);
  console.log(data);
  playground.value = fromJSON(data);
  console.log(playground.value);
};
</script>

<style scoped>

</style>