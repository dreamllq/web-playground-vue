import { JSONSchema7 } from 'json-schema';

export const extensionSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    ref: {
      type: 'string',
      'x-component': 'PlayGroundComponentSelect',
      title: '组件',
      description: '执行方法的组件'
    },
    funcName: {
      type: 'string',
      title: '方法',
      description: '组件方法'
    },
    additionalProperties: false
  }
} as JSONSchema7;