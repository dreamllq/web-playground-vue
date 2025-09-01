import { JSONSchema7 } from 'json-schema';

export const extensionSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    operator: {
      type: 'string',
      title: '规则字符串',
      description: '参考expr-eval编写规则字符串，使用$0,$1...来对应行为配置的参数'
    },
    additionalProperties: false
  }
} as JSONSchema7;