import { Component, EventValue, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('@alsi/auto-pagination').AutoPagination>

type TProps = {
  fetchData?: PropValue,
  autoInit?: PropValue<boolean>,
  noPagination?: PropValue<boolean>,
}

type TSlots = {
  default?: Component<any, any, any>[];
}

export class AutoPagination extends Component<TRef, TProps, TSlots> {
  name: string = 'auto-pagination';

  async getComponent(): Promise<any> {
    return (await import('@alsi/auto-pagination')).AutoPagination;
  }
}