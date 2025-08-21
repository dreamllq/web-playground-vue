import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('element-plus').ElFormItem>

type TProps = {
  prop?: PropValue;
  label?: PropValue;
  rules?: PropValue;
};

type TSlots = {
  default?: Component<any, any, any>[];
}

export class FormItem extends Component<TRef, TProps, TSlots> {
  $class = 'ElFormItem';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElFormItem;
  }
}