<template>
  <div style='display: flex; flex-direction: column; height: 100%; width: 100%;padding: 8px; box-sizing: border-box;'>
    <div style='flex: none;padding-bottom: 8px;'>
      <el-button @click='onSave'>
        save
      </el-button>
      <el-button @click='onCopy'>
        copy
      </el-button>
      <el-button @click='onClear'>
        clear
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

const onClear = () => {
  window.localStorage.removeItem('playground');
};

const onCopy = () => {

};

const a = () => new Promise(resolve => {
  setTimeout(() => {
    resolve('');
    console.log('a');
    
  }, 1000);
});

const b = () => new Promise(resolve => {
  setTimeout(() => {
    resolve('');
    console.log('b');
  }, 1000);
});

const c = () => {
  console.log('c');
  
};

const delay = () => new Promise(resolve => setTimeout(() => resolve(), 1000));
const d = async () => {
  await delay();
  console.log('d');
};

const list = [
  a,
  c,
  b,
  d
];

const exec = (list, index) => {
  const func = list[index];
  const result = func();
  if (result instanceof Promise) {
    return result.then(() => {
      if (index < list.length - 1) {
        return exec(list, index + 1); 
      }
    });
  } else {
    if (index < list.length - 1) {
      return exec(list, index + 1);
    }
  }
};

// exec(list, 0);

</script>

<style scoped>

</style>