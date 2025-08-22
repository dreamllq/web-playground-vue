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

    <div ref='wrapperRef' style='width: 100%; height: 100%; overflow: hidden;'>
      <el-tree-v2
        style='height: 100%;'
        :data='tree'
        :height='height'
      >
        <template #default='{ data }'>
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
            </div>
          </div>
        </template>
      </el-tree-v2>
    </div>
    <!-- <component-item :component='item' /> -->
    <!-- <item-layout :name='item.name'>
        <template #operator>
          <el-button type='danger' link @click='onDelete'>
            <el-icon><delete /></el-icon>
          </el-button>
        </template>
      </item-layout> -->
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
import componentItem from './tree/component-item.vue';
import { useTree } from './use-tree';
import { useElementSize } from '@vueuse/core';

const wrapperRef = ref();
const { width, height } = useElementSize(wrapperRef);
const { playground } = useStore()!;
const { calculateComponent } = useTree();

const addDialogRef = ref<InstanceType<typeof AddDialog>>();

const list = ref<{id: string, name: string}[]>([]);
const tree = ref(playground.tree.map(item => calculateComponent(item)));

onMounted(() => {
  console.log(height.value);
  
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