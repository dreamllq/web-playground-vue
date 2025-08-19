import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('element-plus').ElDialog>

type TProps = {
  modelValue: PropValue;
  'onUpdate:modelValue': EventValue;
  title: PropValue;
  class: PropValue;
  width: PropValue;
};

type TSlots = {
  default?: Component<any, any, any>[];
  header?: Component<any, any, any>[];
  footer?: Component<any, any, any>[];
}

export class Dialog extends Component<TRef, TProps, TSlots> {
  $class = 'ElDialog';
  name: string = 'dialog';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElDialog;
  }
}