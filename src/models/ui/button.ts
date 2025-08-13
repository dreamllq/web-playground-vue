import { EventValue, PropValue } from '@/types/component';
import { Component } from '../foundation/component';

type TRef = InstanceType<typeof import('element-plus').ElButton>

type TProps = {
  type: PropValue,
  'onClick': EventValue
}

export class Button extends Component<TRef, TProps> {
  name: string = 'button';
  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElButton;
  };
}