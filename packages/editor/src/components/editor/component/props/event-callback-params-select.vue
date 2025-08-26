<template>
  <div>
    <el-button
      v-if='model.length === 0'
      type='primary'
      link
      @click='onAdd'>
      <el-icon><plus /></el-icon>
    </el-button>
    <template v-for='(item, index) in model' :key='index'>
      <div class='param-item'>
        <div class='select'>
          <event-callback-param-select :model-value='item' @on-change='(val)=>onChange(index,val)' />
        </div>
        <div class='operator'>
          <el-button type='danger' link @click='onDelete'>
            <el-icon><delete /></el-icon>
          </el-button>
          <el-button
            :style='{
              visibility: model.length-1 === index ? "visible" : "hidden"
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
import { PropsPropValueForm } from './type';
import EventCallbackParamSelect from './event-callback-param-select.vue';

const model = defineModel<PropsPropValueForm[]>({ default: () => [] });

const onChange = (index:number, value: PropsPropValueForm) => {
  model.value[index] = value;
};

const onAdd = () => {
  model.value.push({});
};

const onDelete = (index:number) => {
  model.value = model.value.filter((_, i) => i !== index);
};

</script>

<style scoped lang="scss">
.param-item{
  display: flex;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid var(--el-border-color);

  .select{
    flex: 1;
  }

  .operator{
    flex: none;
    padding-left: 8px;
  }
}
</style>