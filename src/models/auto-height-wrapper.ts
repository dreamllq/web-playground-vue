import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('@alsi/vue-auto-height-wrapper').AutoHeightWrapper>

type TProps = any;

type TSlots = {
  default?: Component<any, any, any>[];
}
export class AutoHeightWrapper extends Component<TRef, TProps, TSlots> {
  $class = 'AutoHeightWrapper';
  name: string = 'auto-height-wrapper';
  async getComponent(): Promise<any> {
    return (await import('@alsi/vue-auto-height-wrapper')).AutoHeightWrapper;
  }
}