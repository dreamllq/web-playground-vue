import { JSONSchema7Type } from 'json-schema';

declare module 'json-schema' {
  interface JSONSchema7 {
    // 添加自定义字段
    'x-component'?: string;
    'x-props'?: JSONSchema7Type;
  }
}