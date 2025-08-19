import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('element-plus').ElForm>

type TProps = {
  model?: PropValue;
  rules?: PropValue;
  inline?: PropValue;
  labelPosition?: PropValue<'left' | 'right' | 'top'>;
  labelWidth?: PropValue;
  labelSuffix?: PropValue;
};

type TSlots = {
  default?: Component<any, any, any>[];
}

export class Form extends Component<TRef, TProps, TSlots> {
  $class = 'ElForm';
  name: string = 'form';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElForm;
  }
}