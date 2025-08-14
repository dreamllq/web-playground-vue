import { Component } from 'l-play-core';

export class Form extends Component {
  name: string = 'form';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElForm;
  }
}