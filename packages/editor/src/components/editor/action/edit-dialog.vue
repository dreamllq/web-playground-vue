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
      :disabled-props='["action"]' />

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
import { useStore } from '../../store';
import { ref } from 'vue';
import BizForm from './form.vue';
import { ActionForm } from './type';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<ActionForm>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();

const title = ref('');

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const action = playground.actions.find(action => action.id === id);
  if (!action) throw new Error('动作不存在');
  action.async = data.async;
  action.name = data.name;

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const action = playground.actions.find(v => v.id === data.id);
  if (!action) throw new Error('操作不存在');

  title.value = `编辑行为-${action.name}`;

  defaultData.value = {
    action: action.$class,
    name: action.name,
    async: action.async
  };

  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>