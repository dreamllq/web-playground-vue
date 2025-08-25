<template>
  <el-dialog
    v-model='dialogVisible'
    title='行为排序'
    width='1000'
  >
    <template v-if='dialogVisible'>
      <div ref='sortAreaRef' class='sort-area'>
        <template v-for='item in components' :key='item.id'>
          <div class='sort-item'>
            {{ item.name }}
          </div>
        </template>
      </div>
    </template>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='dialogVisible = false'>
          取消
        </el-button>
        <el-button type='primary' @click='onSubmit'>
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useStore } from '../../../store';
import { Action, Component } from 'l-play-core';
import Sortable from 'sortablejs';

const { playground } = useStore()!;
const emits = defineEmits(['success']);

const dialogVisible = ref(false);
const components = ref<Component[]>([]);
const sortAreaRef = ref();

let sortable: Sortable | null = null;
const show = async () => {
  components.value = [...playground.tree];

  dialogVisible.value = true;

  await nextTick();

  sortable = new Sortable(sortAreaRef.value, {
    sort: true,
    ghostClass: 'sortable-ghost',
    animation: 150,
    onEnd: async (e) => {
      
      // reloadFlag.value = true;
      // await nextTick();
      const tempRow = components.value[e.oldIndex];
      components.value.splice(e.oldIndex, 1);
      components.value.splice(e.newIndex, 0, tempRow);
      // reloadFlag.value = false;
    }
  });
};

const onSubmit = () => {
  dialogVisible.value = false;
  playground.tree = components.value;
  emits('success');
};

defineExpose({ show });
</script>

<style scoped lang="scss">
.sort-area{
  .sort-item{
    margin: 4px 0;
    background-color: #f2f3f5;
    padding: 4px;
    border-radius: 4px;
  }
}
</style>