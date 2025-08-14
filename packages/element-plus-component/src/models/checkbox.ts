import { Component } from 'l-play-core';

export class Checkbox extends Component {
  name: string = 'checkbox';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElCheckbox;
  }
}