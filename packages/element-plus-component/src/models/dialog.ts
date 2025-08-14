import { Component } from 'l-play-core';

export class Dialog extends Component {
  name: string = 'dialog';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElDialog;
  }
}