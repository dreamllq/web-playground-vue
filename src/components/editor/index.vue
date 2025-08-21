<template>
  <div style='display: flex; flex-direction: column; height: 100%; width: 100%;padding: 8px; box-sizing: border-box;'>
    <div style='flex: none;padding-bottom: 8px;'>
      <el-button @click='onSave'>
        save
      </el-button>
      <el-button @click='onCopy'>
        copy
      </el-button>
    </div>
    <div style='flex: 1; overflow: hidden;'>
      <play-ground-editor
        v-if='ready'
        ref='editorRef'
        :json='json'
        :options='options' />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayGroundEditor, ProvideOptions } from 'l-play-editor';
import { onMounted, ref } from 'vue';
import { useRegister } from './use-register';

const editorRef = ref<InstanceType<typeof PlayGroundEditor>>();
const json = ref();
const ready = ref(false);
const { options } = useRegister();

onMounted(() => {
  const jsonStr = window.localStorage.getItem('playground');
  
  if (jsonStr) {
    json.value = JSON.parse(jsonStr);
  } 

  ready.value = true;
});

const onSave = () => {
  const json = editorRef.value!.api().toJSON();
  console.log(json);
  window.localStorage.setItem('playground', JSON.stringify(json));
};

const onCopy = () => {

};
</script>

<style scoped>

</style>