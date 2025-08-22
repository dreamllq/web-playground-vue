<template>
  <div class='component-select'>
    <div class='select'>
      <el-select-v2
        v-model='model'
        :options='options'
        :multiple='multiple'
        :collapse-tags='collapseTags' 
        :collapse-tags-tooltip='collapseTagsTooltip' 
        placeholder='选择组件' />
    </div>
    <div v-if='multiple' class='operator'>
      <el-button @click='onSort'>
        <el-icon><sort /></el-icon>
      </el-button>
    </div>
    <sort-dialog ref='sortDialogRef' @success='onSuccess' />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../../store';
import SortDialog from './sort-dialog.vue';
import { Sort } from '@element-plus/icons-vue';

defineProps({
  multiple: {
    type: Boolean,
    default: false
  },
  collapseTags: {
    type: Boolean,
    default: false
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: false
  }
});

const { playground } = useStore()!;
const model = defineModel<string | string[]>();
const sortDialogRef = ref<InstanceType<typeof SortDialog>>();

const options = ref<{value: string, label: string}[]>(playground.components.map(item => ({
  value: item.id,
  label: `${item.name}-${item.$class}`
})));

const onSort = () => {
  sortDialogRef.value?.show(model.value as string[]);
};

const onSuccess = (ids:string[]) => {
  model.value = ids;
};
</script>

<style scoped lang="scss">
.component-select{
  display: flex;
  width: 100%;
  
  .select{
    flex: 1;
  }

  .operator{
    flex: none;
    margin-left: 8px;
  }
}
</style>