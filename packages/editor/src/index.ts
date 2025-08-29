export { default as PlayGroundEditor } from './components/index.vue';
export { default as JsonSchemaRender } from './components/editor/common/json-schema-render/index.vue';

export * from './types/editor';

declare module 'json-schema' {
  interface JSONSchema7 {
    // 添加自定义字段
    'x-component'?: string;
    'x-props'?: JSONSchema7Type;
  }
}