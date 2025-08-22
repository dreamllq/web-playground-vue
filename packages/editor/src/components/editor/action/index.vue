<template>
  <area-layout>
    <template #title>
      行为
    </template>
    <template #operator>
      <el-button type='primary' link @click='onAdd'>
        <el-icon><plus /></el-icon>
      </el-button>
    </template>

    <template v-for='item in list' :key='item.id'>
      <item-layout :name='item.name'>
        <template #operator>
          <!-- <el-button type='primary' link @click='onEdit(item)'>
            <el-icon><edit /></el-icon>
          </el-button> -->
          <el-dropdown size='mini' trigger='click'>
            <el-button type='primary' link>
              <el-icon><edit /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click='onEdit(item)'>
                  基本信息
                </el-dropdown-item>
                <el-dropdown-item @click='onEditParams(item)'>
                  参数
                </el-dropdown-item>
                <el-dropdown-item @click='onEditResult(item)'>
                  结果
                </el-dropdown-item>
                <el-dropdown-item @click='onEditExtension(item)'>
                  扩展参数
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
  <edit-params-dialog ref='editParamsDialogRef' />
  <edit-result-dialog ref='editResultDialogRef' />
  <edit-extension-dialog ref='editExtensionDialogRef' />
</template>

<script setup lang="ts">
import AreaLayout from '../layout/area-layout.vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import AddDialog from './add-dialog.vue';
import EditDialog from './edit-dialog.vue';
import { onMounted, ref } from 'vue';
import { useStore } from '../../store';
import ItemLayout from '../layout/item-layout.vue';
import EditParamsDialog from './params/index.vue';
import EditResultDialog from './result/index.vue';
import EditExtensionDialog from './extension/index.vue';

const { playground } = useStore()!;

const addDialogRef = ref<InstanceType<typeof AddDialog>>();
const editDialogRef = ref<InstanceType<typeof EditDialog>>();
const editParamsDialogRef = ref<InstanceType<typeof EditParamsDialog>>();
const editResultDialogRef = ref<InstanceType<typeof EditResultDialog>>();
const editExtensionDialogRef = ref<InstanceType<typeof EditExtensionDialog>>();

type ListItem = {id: string, name: string}

const list = ref<ListItem[]>([]);

onMounted(() => {
  refresh();
});

const onAdd = () => {
  addDialogRef.value!.show();
};

const onEdit = (item) => {
  editDialogRef.value!.show(item);
};

const onEditParams = (item) => {
  editParamsDialogRef.value!.show(item);
};

const onEditResult = (item) => {
  editResultDialogRef.value!.show(item);
};

const onEditExtension = (item) => {
  editExtensionDialogRef.value!.show(item);
};

const onDelete = () => {
  
};

const refresh = () => {
  list.value = playground.actions.map((item) => ({
    id: item.id,
    name: `${item.name}-${item.$class}`
  }));
};
</script>

<style scoped>

</style>