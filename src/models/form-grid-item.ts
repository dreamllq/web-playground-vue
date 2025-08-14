import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('@alsi/vue-form-grid').FormGridItem>

type TProps = {
  prop?: PropValue,
  label?: PropValue,
  onSearch?: EventValue;
}

type TSlots = {
  default?: Component<any, any, any>[];
}

export class FormGridItem extends Component<TRef, TProps, TSlots> {
  name: string = 'form-grid-item';

  async getComponent(): Promise<any> {
    const FormGrid = await import('@alsi/vue-form-grid');
    return FormGrid.FormGridItem;
  }
}