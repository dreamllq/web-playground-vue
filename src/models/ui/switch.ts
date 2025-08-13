import { Component } from '../foundation/component';

export class Switch extends Component {
  name: string = 'switch';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElSwitch;
  }
}