<template>
  <el-dialog
    v-model='dialogVisible'
    :title='title'
    width='1000'
    append-to-body
  >
    <biz-form
      v-if='dialogVisible'
      ref='formRef'
      :default-data='defaultData' 
      :disabled-props='["lifeCycle"]'
    />

    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='dialogVisible = false'>
          取消
        </el-button>
        <el-button type='primary' @click='onSubmit'>
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useStore } from '../../../store';
import { ref } from 'vue';
import BizForm from './form.vue';
import { LifeCycle } from 'l-play-core';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{lifeCycle: LifeCycle, actions: string[]}>();
const formRef = ref<InstanceType<typeof BizForm>>();
const title = ref('');

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const actions = data.actions.map(id => playground.getActionById(id));
  playground.lifeCycle[data.lifeCycle] = actions;

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {lifeCycle: LifeCycle, actions: string[]}) => {

  title.value = `编辑生命周期-${data.lifeCycle}`;
  defaultData.value = {
    lifeCycle: data.lifeCycle,
    actions: data.actions.map(item => item.id)
  };

  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>