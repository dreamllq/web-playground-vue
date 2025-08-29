<template>
  <component
    :is='component'
    v-if='component'
    v-model='model'
    :schema='schema' 
    :render='render' 
    v-bind='schema?.["x-props"]' />
</template>

<script setup lang="ts">
import { JSONSchema7 } from 'json-schema';
import { computed, PropType } from 'vue';
import NotSupport from './not-support.vue';
import AnyRender from './any-render.vue';
import StringRender from './string-render.vue';
import NumberRender from './number-render.vue';
import BoolRender from './bool-render.vue';
import ObjectRender from './object-render/index.vue';
import ArrayRender from './array-render/index.vue';
import IntegerRender from './integer-render.vue';

const model = defineModel<any>({ default: undefined });

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7 | undefined>,
    default: undefined
  },
  render: {
    type: Object,
    default: undefined
  }
});

const component = computed(() => {
  if (!props.schema) {
    return AnyRender;
  }

  if (props.schema['x-component']) {
    if (props.render) {
      const com = props.render[props.schema['x-component']];
      if (!com) {
        console.error(`render中不存在 ${props.schema['x-component']}`);
        console.log(props.render);
        return NotSupport;
      } else {
        return com;
      }
    } else {
      console.error(`render中不存在 ${props.schema['x-component']}`);
      console.log(props.render);
      return NotSupport;
    }

  }

  if (props.schema.type === 'string') {
    return StringRender;
  } else if (props.schema.type === 'number') {
    return NumberRender;
  } else if (props.schema.type === 'boolean') {
    return BoolRender;
  } else if (props.schema.type === 'object') {
    return ObjectRender;
  } else if (props.schema.type === 'array') {
    return ArrayRender;
  } else if (props.schema.type === 'integer') {
    return IntegerRender;
  } else {
    return NotSupport;
  }
});

</script>

<style scoped>

</style>