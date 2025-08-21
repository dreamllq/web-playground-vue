<template>
  <el-dialog
    v-model='dialogVisible'
    title='编辑组件'
    width='500'
    append-to-body
  >
    <biz-form
      v-if='dialogVisible'
      ref='formRef' 
      :default-data='defaultData' 
      :disabled-props='["component"]' />

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
import { ComponentForm } from './type';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<ComponentForm>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');
  
  component.name = data.name;
  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const component = playground.components.find(v => v.id === data.id);
  if (!component) throw new Error('组件不存在');
  defaultData.value = {
    name: component.name,
    component: component.$class
  };
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>