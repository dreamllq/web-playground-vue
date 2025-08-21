import { EventValue, PropValue } from 'l-play-core';
import { Component } from 'l-play-core';

type TRef = InstanceType<typeof import('element-plus').ElButton>

type TProps = {
  size?: PropValue<'large' | 'default' | 'small'>,
  type?: PropValue<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''>,
  plain?: PropValue<boolean>,
  link?:PropValue<boolean>,
  icon?: PropValue<string>,
  loading?: PropValue<boolean>,
  'onClick'?: EventValue
}

export class Button extends Component<TRef, TProps> {
  $class = 'ElButton';
  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElButton;
  };
}