import { Component } from '../foundation/component';

export class Select extends Component {
  name: string = 'select';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElSelect;
  }

}