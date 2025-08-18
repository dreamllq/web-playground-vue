import { Component, PropValue } from 'l-play-core';

type TRef = InstanceType<typeof import('element-plus').ElTableColumn>

type TProps = {
  prop: PropValue;
  label: PropValue;
  minWidth: PropValue;
  showOverflowTooltip: PropValue<boolean>;
  width: PropValue;
}

type TSlots = {
  default?: Component[]
}


export class TableColumn extends Component<TRef, TProps, TSlots> {
  name: string = 'table-column';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElTableColumn;
  }
}