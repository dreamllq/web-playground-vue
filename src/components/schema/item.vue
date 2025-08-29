<template>
  <div>
    <p>
      {{ title }}
    </p>
    <json-schema-render v-model='stringSchemaValue' :schema='schema' :render='render' />
    <p>
      {{ stringSchemaValue }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { JSONSchema7 } from 'json-schema';
import { JsonSchemaRender } from 'l-play-editor';
import { PropType, ref } from 'vue';

const props = defineProps({
  schema: {
    type: Object as PropType<JSONSchema7>,
    default: () => ({})
  },
  title: {
    type: String,
    default: ''
  },
  render: {
    type: Object,
    default: undefined
  }
});

const stringSchemaValue = ref();
</script>

<style scoped>

</style>