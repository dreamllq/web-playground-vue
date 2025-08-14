import { Component } from 'l-play-core';

export class Table extends Component {
  name: string = 'table';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElTable;
  }
}