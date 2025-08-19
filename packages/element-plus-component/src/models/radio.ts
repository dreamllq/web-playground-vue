import { Component } from 'l-play-core';

export class Radio extends Component {
  $class = 'ElRadio';
  name: string = 'radio';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElRadio;
  }
}