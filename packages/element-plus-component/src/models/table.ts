import { Component, PropValue } from 'l-play-core';


type TRef = InstanceType<typeof import('element-plus').ElTable>

type TProps = {
  border?: PropValue<boolean>,
  data?: PropValue<any[]>,
  height?: PropValue<string | number>,
}

type TSlots = {
  default?: Component[]
}

export class Table extends Component<TRef, TProps, TSlots> {
  $class = 'ElTable';
  name: string = 'table';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElTable;
  }
}