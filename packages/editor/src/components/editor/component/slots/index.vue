<template>
  <el-dialog
    v-model='dialogVisible'
    :title='title'
    width='900'
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
import { useStore } from '../../../store';
import { ref } from 'vue';
import BizForm from './form.vue';
import { SlotItem } from './type';

const emits = defineEmits(['success']);
const { playground } = useStore()!;
const dialogVisible = ref(false);
const defaultData = ref<{slots: SlotItem[]}>();
let id:string = '';
const formRef = ref<InstanceType<typeof BizForm>>();
const title = ref('');

const onSubmit = async () => {
  const data = await formRef.value!.getData();
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');

  component.slots = {};
  data.slots.forEach(({ name, components }) => {
    component.slots[name!] = components!.map(id => {
      const component = playground.components.find(v => v.id === id);
      if (!component) throw new Error('组件不存在');
      return component;
    });
  });
  

  dialogVisible.value = false;
  emits('success');
};

const show = (data: {id: string}) => {
  id = data.id;
  const component = playground.components.find(v => v.id === id);
  if (!component) throw new Error('组件不存在');

  title.value = `编辑组件插槽-${component.name}`;

  const slots: SlotItem[] = [];

  Object.entries(component.slots).forEach(([name, components]) => {
    slots.push({
      name,
      components: components.map(c => c.id)
    });
  });

  defaultData.value = { slots };
  
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>