import { Component } from 'l-play-core';

export class Radio extends Component {
  $class = 'ElRadio';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElRadio;
  }
}