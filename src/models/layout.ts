import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('@alsi/vue-layout').ProLayout>

type TProps = {
  type: PropValue<'vertical'>
}

type TSlots = {
  filter?: Component<any, any, any>[];
  buttonGroup?: Component<any, any, any>[];
  buttonGroupSuffix?: Component<any, any, any>[];
  tableInfo?: Component<any, any, any>[];
  dataTable?: Component<any, any, any>[];
}

export class Layout extends Component<TRef, TProps, TSlots> {
  name: string = 'layout';

  async getComponent(): Promise<any> {
    const Layout = await import('@alsi/vue-layout');
    return Layout.ProLayout;
  };
}