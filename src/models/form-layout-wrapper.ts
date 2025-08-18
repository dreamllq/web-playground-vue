import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('@alsi/vue-form-layout-wrapper').FormLayoutWrapper>

type TProps = {
  col?: PropValue,
}

type TSlots = {
  default?: Component<any, any, any>[];
}


export class FormLayoutWrapper extends Component<TRef, TProps, TSlots> {
  name: string = 'form-layout-wrapper';

  async getComponent(): Promise<any> {
    return (await import('@alsi/vue-form-layout-wrapper')).FormLayoutWrapper;
  }
}