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
              {{ data.label }}{{ console.log(node) }}
            </div>
            <div v-if='data.data.type === "component"' style='flex: none; padding: 0 8px;'>
              <el-dropdown size='mini' trigger='click'>
                <el-button type='primary' link @click.prevent.stop>
                  <el-icon><edit /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      基本信息
                    </el-dropdown-item>
                    <el-dropdown-item>
                      参数
                    </el-dropdown-item>
                    <el-dropdown-item>
                      指令
                    </el-dropdown-item>
                    <el-dropdown-item>
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
          </div>
        </template>
      </el-tree-v2>
    </div>
  </area-layout>
  <add-dialog ref='addDialogRef' @success='refresh' />
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

const wrapperRef = ref();
const { width, height } = useElementSize(wrapperRef);
const { playground } = useStore()!;
const { calculateComponent } = useTree();

const addDialogRef = ref<InstanceType<typeof AddDialog>>();

const list = ref<{id: string, name: string}[]>([]);
const tree = ref(playground.tree.map(item => calculateComponent(item)));

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

const refresh = () => {
  tree.value = playground.tree.map(item => calculateComponent(item));
};

const onSort = () => {
  
};
</script>

<style scoped>

</style>