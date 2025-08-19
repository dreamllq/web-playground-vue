import { Component } from 'l-play-core';

export class Switch extends Component {
  $class = 'ElSwitch';
  name: string = 'switch';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElSwitch;
  }
}