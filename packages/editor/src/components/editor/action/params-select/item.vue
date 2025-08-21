<template>
  <div class='param-item'>
    <div class='select'>
      <param-select v-model='model' />
    </div>
    <div class='operator'>
      <el-button type='danger' link @click='onDelete'>
        <el-icon><delete /></el-icon>
      </el-button>
      <el-button
        v-if='showAdd'
        type='primary'
        link
        @click='onAdd'>
        <el-icon><plus /></el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import ParamSelect from '../param-select/index.vue';
import { ref, watch } from 'vue';
import { ParamType } from 'l-play-core';
import { ActionFormParam } from '../type';

const model = defineModel<ActionFormParam>({ default: () => ({ type: ParamType.VALUE }) });

const props = defineProps({
  showAdd: {
    type: Boolean,
    default: false
  }
});

watch(model, () => {
  emits('change', model.value);
}, { deep: true });

const emits = defineEmits([
  'add',
  'delete',
  'change'
]);
const onAdd = () => {
  emits('add');
};

const onDelete = () => {
  emits('delete');
};
</script>

<style scoped lang="scss">
.param-item{
  display: flex;
  width: 100%;
  padding: 4px 0;

  .select{
    flex: none;
  }

  .operator{
    flex: none;
    padding-left: 8px;
  }
}
</style>