import { JSONSchema7 } from 'json-schema';

export const extensionSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      title: 'url'
    },
    method: {
      type: 'string',
      title: 'method',
      enum: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'PATCH',
        'HEAD',
        'OPTIONS'
      ]
    },
    headers: {
      type: 'object',
      title: 'headers',
      additionalProperties: { type: 'string' }
    },
    body: {
      oneOf: [
        { type: 'number' },
        { type: 'string' },
        {
          type: 'object',
          additionalProperties: true
        }
      ],
      title: 'body'
    },
    query: {
      type: 'object',
      title: 'query',
      additionalProperties: true
    },
    params: {
      type: 'object',
      title: 'params',
      additionalProperties: true
    },
    additionalProperties: false
  }
} as JSONSchema7;