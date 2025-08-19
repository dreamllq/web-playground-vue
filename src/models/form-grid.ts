import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('@alsi/vue-form-grid').FormGrid>

type TProps = {
  model?: PropValue,
  onSearch?: EventValue;
}

type TSlots = {
  default?: Component<any, any, any>[];
}


export class FormGrid extends Component<TRef, TProps, TSlots> {
  $class = 'FormGrid';
  name: string = 'form-grid';

  async getComponent(): Promise<any> {
    const FormGrid = await import('@alsi/vue-form-grid');
    return FormGrid.FormGrid;
  }
}