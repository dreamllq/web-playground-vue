import { EventValue, PropValue } from 'l-play-core';
import { Component } from 'l-play-core';
import { ElButton } from 'element-plus';

type TRef = InstanceType<typeof ElButton>

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
  async: boolean = false;
  getComponent() {
    return ElButton;
  };
}