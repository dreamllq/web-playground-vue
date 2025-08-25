import { ParamType, ParamValueJSON } from '../types/action';
import { BuildPlaygroundOptions } from '../types/register';

export class ParamValue {
  type: ParamType.VALUE = ParamType.VALUE;
  value: any; 

  constructor(value: any) {
    this.value = value;
  }

  toJSON(): ParamValueJSON {
    return {
      type: 'VALUE',
      value: this.value
    };
  }
      
  static fromJSON(json: ParamValueJSON, options:BuildPlaygroundOptions): ParamValue {
    return new ParamValue(json.value);
  }
}