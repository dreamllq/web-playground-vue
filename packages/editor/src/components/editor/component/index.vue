<template>
  <area-layout>
    <template #title>
      组件
    </template>
    <template #operator>
      <el-button type='primary' link @click='onAdd'>
        <el-icon><plus /></el-icon>
      </el-button>
    </template>

    <template v-for='item in list' :key='item.id'>
      <item-layout :name='item.name'>
        <template #operator>
          <el-dropdown size='mini' trigger='click'>
            <el-button type='primary' link>
              <el-icon><edit /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click='onEdit(item)'>
                  基本信息
                </el-dropdown-item>
                <el-dropdown-item @click='onPropsEdit(item)'>
                  参数
                </el-dropdown-item>
                <el-dropdown-item>指令</el-dropdown-item>
                <el-dropdown-item @click='onSlotsEdit(item)'>
                  插槽
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button type='danger' link @click='onDelete'>
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </item-layout>
    </template>
  </area-layout>
  <add-dialog ref='addDialogRef' @success='refresh' />
  <edit-dialog ref='editDialogRef' @success='refresh' />
  <edit-props-dialog ref='editPropsDialogRef' />
  <edit-slots-dialog ref='editSlotsDialogRef' />
</template>

<script setup lang="ts">
import AreaLayout from '../layout/area-layout.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import AddDialog from './add-dialog.vue';
import EditDialog from './edit-dialog.vue';
import { onMounted, ref } from 'vue';
import { useStore } from '../../store';
import ItemLayout from '../layout/item-layout.vue';
import EditPropsDialog from './props/index.vue';
import EditSlotsDialog from './slots/index.vue';

const { playground } = useStore()!;

const addDialogRef = ref<InstanceType<typeof AddDialog>>();
const editDialogRef = ref<InstanceType<typeof EditDialog>>();
const editPropsDialogRef = ref<InstanceType<typeof EditPropsDialog>>();
const editSlotsDialogRef = ref<InstanceType<typeof EditSlotsDialog>>();

const list = ref<{id: string, name: string}[]>([]);

onMounted(() => {
  refresh();
});

const onAdd = () => {
  addDialogRef.value!.show();
};

const onEdit = (item) => {
  editDialogRef.value!.show(item);
};

const onPropsEdit = (item) => {
  editPropsDialogRef.value!.show(item);
};

const onSlotsEdit = (item) => {
  editSlotsDialogRef.value!.show(item);
};

const onDelete = () => {
  
};

const refresh = () => {
  list.value = playground.components.map((item) => ({
    id: item.id,
    name: `${item.name}-${item.$class}`
  }));
};
</script>

<style scoped>

</style>