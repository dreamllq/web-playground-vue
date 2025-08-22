<template>
  <div>
    <div>{{ component.name }}</div>
    <div v-if='Object.keys(component.props).length>0' style='padding-left: 8px;'>
      <div>props</div>
      <div style='padding-left: 8px;'>
        <template v-for='(name, index) in Object.keys(component.props)' :key='index'>
          <div>{{ name }}</div>
        </template>
      </div>
    </div>
    
    <div v-if='Object.keys(component.directives).length>0' style='padding-left: 8px;'>
      <div>directives</div>
      <div style='padding-left: 8px;'>
        <template v-for='(name, index) in Object.keys(component.directives)' :key='index'>
          <div>{{ name }}</div>
        </template>
      </div>
    </div>
    <div v-if='Object.keys(component.slots).length>0' style='padding-left: 8px;'>
      <div>slots</div>
      <div style='padding-left: 8px;'>
        <template v-for='(name, index) in Object.keys(component.slots)' :key='index'>
          <div style='padding-left: 8px;'>
            <div>{{ name }}</div>
            <div style='padding-left: 8px;'>
              <template v-for='(item, index1) in component.slots[name]' :key='index1'>
                <component-item :component='item' />
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Component } from 'l-play-core';
import { PropType } from 'vue';
import ComponentItem from './component-item.vue';

const props = defineProps({
  component: {
    type: Object as PropType<Component>,
    required: true
  }
});
</script>

<style scoped>

</style>