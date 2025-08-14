import { Component } from 'l-play-core';

export class Select extends Component {
  name: string = 'select';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElSelect;
  }

}