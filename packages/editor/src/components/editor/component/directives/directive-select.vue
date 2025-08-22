<template>
  <el-form label-width='80px' style='width: 100%;'>
    <el-form-item label='名称' prop='name'>
      <el-input v-model='model.name' />
    </el-form-item>
    <el-form-item label='值' prop='value'>
      <prop-value-select v-model='model.value' />
    </el-form-item>
    <el-form-item label='arg' prop='arg'>
      <el-input v-model='model.arg' />
    </el-form-item>
    <el-form-item label='modifiers' prop='modifiers'>
      <div style='flex: 1;'>
        <object-render v-model='model.modifiers' />
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { DirectiveItem } from '../type';
import PropValueSelect from '../props/prop-value-select.vue';
import ObjectRender from '../../common/json-schema-render/object-render/index.vue';

const model = defineModel<DirectiveItem>({ default: () => ({}) });
</script>

<style scoped>

</style>