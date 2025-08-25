import { PropType } from './component';

export type ComponentConfigPropsItem = {
  name: string;
  type: PropType
}

export type ComponentConfigSlotsItem = {
  name: string;
}

export type ComponentConfig = {
  name: string;
  props?: ComponentConfigPropsItem[],
  slots?: ComponentConfigSlotsItem[],
}