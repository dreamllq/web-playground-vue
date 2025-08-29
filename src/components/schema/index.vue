<template>
  <el-form label-width='80px'>
    <item-render title='null' :schema='{type:"null"}' />
    <item-render title='string' :schema='{type:"string"}' />
    <item-render title='number' :schema='{type:"number"}' />
    <item-render title='integer' :schema='{type:"integer"}' />
    <item-render title='boolean' :schema='{type:"boolean"}' />
    <item-render title='array' :schema='{type:"array"}' />
    <item-render title='object' :schema='{type:"object", additionalProperties: true}' />
    <item-render title='string-enum' :schema='{type:"string", enum:["a", "b"]}' />
    <item-render title='number-enum' :schema='{type:"number", enum:[1, 2]}' />
    <item-render title='object-prop' :schema='{type:"object", properties:{a:{type:"string", title:"a"}, b:{type:"number",title:"b"}, c:{type:"boolean",title:"c"}}}' />
    <item-render
      title='object-prop-prop'
      :schema='{
        type:"object", 
        properties:
          {
            a:{type:"string", title:"a"}, 
            b:{
              type:"object",
              title:"b",
              properties:{
                a:{type:"string", title:"a"}, 
                b:{type:"string", title:"b"}, 
                c:{type:"string", title:"c"}
              }
            },
            d:{type:"number",title:"d"}, 
            c:{type:"boolean",title:"c"}
          }
      }' />
    <item-render title='object-string' :schema='{type:"object", additionalProperties: {type: "number"}}' />
    <item-render title='string' :schema='{type:"string", "x-component":"ElDatePicker", "x-props":{type:"year"}}' :render='render' />
  </el-form>
</template>

<script setup lang="ts">
import { JsonSchemaRender } from 'l-play-editor';
import { ref } from 'vue';
import ItemRender from './item.vue';
import { ElDatePicker } from 'element-plus';

const render = { ElDatePicker: ElDatePicker };

</script>

<style scoped>

</style>