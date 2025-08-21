import { PropValueType } from 'l-play-core';

export const PropValueTypeList = [
  {
    label: '值',
    value: PropValueType.VALUE
  },
  {
    label: '变量',
    value: PropValueType.VARIABLE
  },
  {
    label: '变量-键',
    value: PropValueType.VARIABLE_VALUE
  },
  {
    label: '父组件',
    value: PropValueType.SLOT_CONTEXT
  },
  {
    label: '方法',
    value: PropValueType.FUNCTION
  }
];