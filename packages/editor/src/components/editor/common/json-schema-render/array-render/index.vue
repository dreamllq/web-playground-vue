<template>
  <div class='json-schema-render array-render'>
    <el-button
      v-if='model.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>
    <template v-for='(item, index) in model' :key='index'>
      <div class='array-item'>
        <div class='select'>
          <any-render :model-value='item' @update:model-value='(val)=>onChange(index,val)' />
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
import AnyRender from '../any-render.vue';
const model = defineModel<any[]>({ default: () => [] });

const onAdd = () => {
  model.value.push('');
};

const onChange = (index:number, val: any) => {
  model.value[index] = val;
};

const onDelete = (index:number) => {
  model.value = model.value.filter((_, i) => i !== index);
};
</script>

<style scoped lang="scss">
.array-item{
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--el-border-color);
  padding: 8px 0;
  .value-type{
    flex: none;
    padding-right: 8px;
  }
  
  .select{
    flex:1;
  }

  .operator{
    flex: none;
    padding-left: 8px;
  }
}
</style>