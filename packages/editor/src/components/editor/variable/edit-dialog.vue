<template>
  <el-dialog
    v-model='dialogVisible'
    title='编辑变量'
    width='1000'
    append-to-body
  >
    <biz-form v-if='dialogVisible' ref='formRef' :default-data='defaultData' />

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

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{name: string, value: string}>({
  name: '',
  value: '' 
});
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const variable = playground.variables.find(v => v.id === id);
  if (!variable) throw new Error('变量不存在');
  variable.name = data.name;
  variable.value = data.value;

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const variable = playground.variables.find(v => v.id === data.id);
  if (!variable) throw new Error('变量不存在');
  defaultData.value.name = variable.name;
  defaultData.value.value = variable.value;
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>