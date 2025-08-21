import { Component } from 'l-play-core';
import { EventValue, PropItem, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('element-plus').ElInput>

type TProps = {
  modelValue: PropValue,
  'onUpdate:modelValue': EventValue
}

export class Input extends Component<TRef, TProps> {
  $class = 'ElInput';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElInput;
  }
}