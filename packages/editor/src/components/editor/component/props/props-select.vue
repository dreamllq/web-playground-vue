<template>
  <div class='props-select'>
    <el-button
      v-if='model.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>

    <template v-for='(item, index) in model' :key='index'>
      <div class='props-select-item'>
        <div class='select'>
          <prop-select :model-value='item' @update:model-value='(val)=>onChange(index,val)' />
        </div>
        <div class='operator'>
          <el-button type='danger' link @click='onDelete(index)'>
            <el-icon><delete /></el-icon>
          </el-button>
          <el-button
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

import PropSelect from './prop-select.vue';
import { PropsPropItem } from './type';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';

const model = defineModel<PropsPropItem[]>({ default: () => [] });

const onChange = (index:number, value:PropsPropItem) => {
  model.value[index] = value;
};

const onDelete = (index:number) => {
  model.value = model.value.filter((_, i) => i !== index);
};

const onAdd = () => {
  model.value.push({ name: '' });
};
</script>

<style scoped lang="scss">
.props-select-item{
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  
  .select{
    flex:1;
  }

  .operator{
    flex: none;
    padding-left: 8px;
  }
}
</style>