<template>
  <div class='directives-select'>
    <el-button
      v-if='model.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>

    <template v-for='(item, index) in model' :key='index'>
      <div class='directives-select-item'>
        <div class='select'>
          <directive-select :model-value='item' @update:model-value='(val)=>onChange(index,val)' />
        </div>
        <div class='operator'>
          <el-button type='danger' link @click='onDelete(index)'>
            <el-icon><delete /></el-icon>
          </el-button>
          <el-button
            :style='{
              visibility: index === model.length - 1 ? "visible" : "hidden"
            }'
            type='primary'
            link
            @click='onAdd'>
            <el-icon><plus /></el-icon>
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import DirectiveSelect from './directive-select.vue';
import { DirectiveItem } from '../type';

const model = defineModel<DirectiveItem[]>({ default: () => [] });

const onChange = (index:number, value:DirectiveItem) => {
  model.value[index] = value;
};

const onDelete = (index:number) => {
  model.value = model.value.filter((_, i) => i !== index);
};

const onAdd = () => {
  model.value.push({
    name: '',
    value: {} 
  });
};
</script>

<style scoped lang="scss">
.directives-select-item{
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--el-border-color);
  padding: 8px 0;
  
  .select{
    flex:1;
  }

  .operator{
    flex: none;
    padding-left: 8px;
  }
}
</style>