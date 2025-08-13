import { Component } from '../foundation/component';
import { EventValue, PropItem, PropValue } from '@/types/component';

type TRef = InstanceType<typeof import('element-plus').ElInput>

type TProps = {
  modelValue: PropValue,
  'onUpdate:modelValue': EventValue
}

export class Input extends Component<TRef, TProps> {
  name: string = 'input';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElInput;
  }
}