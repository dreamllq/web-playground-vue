<template>
  <area-layout>
    <template #title>
      页面树
    </template>
    <template #operator>
      <el-button type='primary' link @click='onAdd'>
        <el-icon><plus /></el-icon>
      </el-button>
    </template>

    <template v-for='item in list' :key='item.id'>
      <item-layout :name='item.name'>
        <template #operator>
          <el-button type='danger' link @click='onDelete'>
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </item-layout>
    </template>
  </area-layout>
  <add-dialog ref='addDialogRef' @success='refresh' />
</template>

<script setup lang="ts">
import AreaLayout from '../layout/area-layout.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import AddDialog from './add-dialog.vue';
import { onMounted, ref } from 'vue';
import { useStore } from '../../store';
import ItemLayout from '../layout/item-layout.vue';

const { playground } = useStore()!;

const addDialogRef = ref<InstanceType<typeof AddDialog>>();

const list = ref<{id: string, name: string}[]>([]);

onMounted(() => {
  refresh();
});

const onAdd = () => {
  addDialogRef.value!.show();
};


const onDelete = () => {
  
};

const refresh = () => {
  list.value = playground.tree.map((item) => ({
    id: item.id,
    name: `${item.name}-${item.$class}`
  }));
};
</script>

<style scoped>

</style>