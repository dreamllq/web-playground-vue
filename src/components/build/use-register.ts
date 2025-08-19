import { Register, PlaygroundJSON } from 'l-play-core';
import { ActionFetch, ActionCallback, ActionOperator, ActionRef, ActionStructTransform } from 'l-play-action';
import { Div, Span, Text } from 'l-play-dom-component';
import { Button, Checkbox, Dialog, Form, FormItem, Icon, Input, 
  Radio, Select, Switch, Table, TableColumn, DatePicker } from 'l-play-element-plus-component';
import { VIfElse } from 'l-play-vue-component';
import { Layout } from '@/models/layout';
import { FormLayoutWrapper } from '@/models/form-layout-wrapper';
import { FormGrid } from '@/models/form-grid';
import { FormGridItem } from '@/models/form-grid-item';
import { AutoPagination } from '@/models/auto-pagination';
import { AutoHeightWrapper } from '@/models/auto-height-wrapper';

export const useRegister = () => {
  const register = new Register();

  register.actionRegister.register('ActionFetch', ActionFetch);
  register.actionRegister.register('ActionCallback', ActionCallback);
  register.actionRegister.register('ActionOperator', ActionOperator);
  register.actionRegister.register('ActionRef', ActionRef);
  register.actionRegister.register('ActionStructTransform', ActionStructTransform);

  register.componentRegister.register('Div', Div);
  register.componentRegister.register('Span', Span);
  register.componentRegister.register('Text', Text);

  register.componentRegister.register('ElButton', Button);
  register.componentRegister.register('ElCheckbox', Checkbox);
  register.componentRegister.register('ElDialog', Dialog);
  register.componentRegister.register('ElForm', Form);
  register.componentRegister.register('ElFormItem', FormItem);
  register.componentRegister.register('ElIcon', Icon);
  register.componentRegister.register('ElInput', Input);
  register.componentRegister.register('ElRadio', Radio);
  register.componentRegister.register('ElSelect', Select);
  register.componentRegister.register('ElSwitch', Switch);
  register.componentRegister.register('ElTable', Table);
  register.componentRegister.register('ElTableColumn', TableColumn);
  register.componentRegister.register('ElDatePicker', DatePicker);

  register.componentRegister.register('VIfElse', VIfElse);

  register.componentRegister.register('Layout', Layout);
  register.componentRegister.register('FormLayoutWrapper', FormLayoutWrapper);
  register.componentRegister.register('FormGrid', FormGrid);
  register.componentRegister.register('FormGridItem', FormGridItem);
  register.componentRegister.register('AutoPagination', AutoPagination);
  register.componentRegister.register('AutoHeightWrapper', AutoHeightWrapper);

  const fromJSON = (json: PlaygroundJSON) => register.fromJSON(json);

  return {
    register,
    fromJSON 
  };
};