import { Component } from 'l-play-core';

export class DatePicker extends Component {
  $class = 'ElDatePicker';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElDatePicker;
  }
}