<template>
  <el-dialog
    v-model='dialogVisible'
    title='新增生命周期'
    width='1000'
    append-to-body
  >
    <biz-form v-if='dialogVisible' ref='formRef' />
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
import { ref } from 'vue';
import BizForm from './form.vue';
import { useStore } from '../../../store';

const { playground } = useStore()!;
const dialogVisible = ref(false);
const formRef = ref<InstanceType<typeof BizForm>>();

const emits = defineEmits(['success']);

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const actions = data.actions.map(id => playground.getActionById(id));
  playground.lifeCycle[data.lifeCycle] = actions;

  dialogVisible.value = false;
  emits('success');
};

const show = () => {
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>