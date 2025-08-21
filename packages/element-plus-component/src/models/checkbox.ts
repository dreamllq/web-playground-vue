import { Component } from 'l-play-core';

export class Checkbox extends Component {
  $class = 'ElCheckbox';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElCheckbox;
  }
}