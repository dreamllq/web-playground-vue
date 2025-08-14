import { Component } from 'l-play-core';

export class DatePicker extends Component {
  name: string = 'date-picker';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElDatePicker;
  }
}