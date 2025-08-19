import { ParamType } from '@core/types/action';

export class ParamValue {
  type: ParamType.VALUE = ParamType.VALUE;
  value: any; 

  constructor(value: any) {
    this.value = value;
  }
}