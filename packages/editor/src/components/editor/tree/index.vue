<template>
  <area-layout>
    <template #title>
      页面树
    </template>
    <template #operator>
      <el-button type='primary' link @click='onAdd'>
        <el-icon><plus /></el-icon>
      </el-button>
      <el-button type='primary' link @click='onSort'>
        <el-icon><sort /></el-icon>
      </el-button>
      <el-button type='primary' link @click='refresh'>
        <el-icon><refresh-icon /></el-icon>
      </el-button>
    </template>

    <div ref='wrapperRef' style='width: 100%; height: 100%; overflow: hidden;'>
      <el-tree-v2
        style='height: 100%;'
        :data='tree'
        :height='height'
      >
        <template #default='{ data, node }'>
          <div style='width: 100%; display: flex;'>
            <div style='flex: 1; overflow: hidden;'>
              {{ data.label }}
            </div>
            <div v-if='data.data.type === "component"' style='flex: none; padding: 0 8px;'>
              <el-dropdown size='mini' trigger='click'>
                <el-button type='primary' link @click.prevent.stop>
                  <el-icon><edit /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click='onEdit(data.data.data)'>
                      基本信息
                    </el-dropdown-item>
                    <el-dropdown-item @click='onPropsEdit(data.data.data)'>
                      参数
                    </el-dropdown-item>
                    <el-dropdown-item @click='onDirectivesEdit(data.data.data)'>
                      指令
                    </el-dropdown-item>
                    <el-dropdown-item @click='onSlotsEdit(data.data.data)'>
                      插槽
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-button
                v-if='node.level === 1'
                type='danger'
                link
                @click.prevent.stop='onDelete(data)'>
                <el-icon><delete /></el-icon>
              </el-button>
            </div>

            <div v-if='data.data.type === "lifeCycleArea"' style='flex: none; padding: 0 8px;'>
              <el-button type='primary' link @click='onAddLifeCycle'>
                <el-icon><plus /></el-icon>
              </el-button>
            </div>

            <div v-if='data.data.type === "lifeCycle"' style='flex: none; padding: 0 8px;'>
              <el-button type='primary' link @click='onEditLifeCycle(data.data.data)'>
                <el-icon><edit /></el-icon>
              </el-button>
            </div>
          </div>
        </template>
      </el-tree-v2>
    </div>
  </area-layout>
  <add-dialog ref='addDialogRef' @success='refresh' />
  <sort-dialog ref='sortDialogRef' @success='refresh' />
  <edit-dialog ref='editDialogRef' @success='refresh' />
  <edit-props-dialog ref='editPropsDialogRef' />
  <edit-slots-dialog ref='editSlotsDialogRef' />
  <edit-directives-dialog ref='editDirectivesDialogRef' />
  <add-life-cycle-dialog ref='addLifeCycleDialogRef' @success='refresh' />
  <edit-life-cycle-dialog ref='editLifeCycleDialogRef' @success='refresh' />
</template>

<script setup lang="ts">
import AreaLayout from '../layout/area-layout.vue';
import { Plus, Edit, Delete, Refresh as RefreshIcon, Sort } from '@element-plus/icons-vue';
import AddDialog from './add-dialog.vue';
import { onMounted, ref } from 'vue';
import { useStore } from '../../store';
import { useTree } from './use-tree';
import { useElementSize } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';
import SortDialog from './sort/index.vue';
import EditDialog from '../component/edit-dialog.vue';
import EditPropsDialog from '../component/props/index.vue';
import EditSlotsDialog from '../component/slots/index.vue';
import EditDirectivesDialog from '../component/directives/index.vue';
import AddLifeCycleDialog from './life-cycle/add-dialog.vue';
import EditLifeCycleDialog from './life-cycle/edit-dialog.vue';

const wrapperRef = ref();
const { width, height } = useElementSize(wrapperRef);
const { playground } = useStore()!;
const { calculateComponent, calculateLifeCycle } = useTree();

const addDialogRef = ref<InstanceType<typeof AddDialog>>();
const sortDialogRef = ref<InstanceType<typeof sortDialogRef>>();
const editDialogRef = ref<InstanceType<typeof EditDialog>>();
const editPropsDialogRef = ref<InstanceType<typeof EditPropsDialog>>();
const editSlotsDialogRef = ref<InstanceType<typeof EditSlotsDialog>>();
const editDirectivesDialogRef = ref<InstanceType<typeof EditDirectivesDialog>>();

const addLifeCycleDialogRef = ref<InstanceType<typeof AddLifeCycleDialog>>();
const editLifeCycleDialogRef = ref<InstanceType<typeof EditLifeCycleDialog>>();

const list = ref<{id: string, name: string}[]>([]);
const tree = ref();

const calculateTree = () => {
  const components = playground.tree.map(item => calculateComponent(item));
  const lifeCycle = calculateLifeCycle();
  tree.value = [lifeCycle, ...components];
};

calculateTree();

onMounted(() => {
  refresh();
});

const onAdd = () => {
  addDialogRef.value!.show();
};

const onDelete = async (data) => {
  await ElMessageBox.confirm('确定删除吗？', '确认');
  const index = tree.value.findIndex(item => item.id === data.id);
  playground.tree = playground.tree.filter((item, i) => index !== i);
  refresh();
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

const onDirectivesEdit = (item) => {
  editDirectivesDialogRef.value!.show(item);
};

const onAddLifeCycle = () => {
  addLifeCycleDialogRef.value!.show();
};

const onEditLifeCycle = (item) => {
  editLifeCycleDialogRef.value!.show(item);
};

const refresh = () => {
  calculateTree();
};

const onSort = () => {
  sortDialogRef.value.show();
};
</script>

<style scoped>

</style>