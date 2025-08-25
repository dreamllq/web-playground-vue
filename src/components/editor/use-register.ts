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
import { ProvideOptions } from 'l-play-editor';

export const useRegister = () => {

  const options:ProvideOptions = {
    register: {
      actions: {
        ActionFetch: ActionFetch,
        ActionCallback: ActionCallback,
        ActionOperator: ActionOperator,
        ActionRef: ActionRef,
        ActionStructTransform: ActionStructTransform
      },
      components: {
        Div: Div,
        Span: Span,
        Text: Text,
        ElButton: Button,
        ElCheckbox: Checkbox,
        ElDialog: Dialog,
        ElForm: Form,
        ElFormItem: FormItem,
        ElInput: Input,
        ElSelect: Select,
        ElTable: Table,
        ElTableColumn: TableColumn,
        ElSwitch: Switch,
        ElDatePicker: DatePicker,
        ElIcon: Icon,
        VIfElse: VIfElse,
        Layout: Layout,
        FormLayoutWrapper: FormLayoutWrapper,
        FormGrid: FormGrid,
        FormGridItem: FormGridItem,
        AutoPagination: AutoPagination,
        AutoHeightWrapper: AutoHeightWrapper
      } 
    } 
  };
  return { options };
};