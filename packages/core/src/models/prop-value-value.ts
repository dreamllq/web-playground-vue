import { PropValueType, PropValueValueJSON } from '../types/component';
import { BuildPlaygroundOptions } from '../types/register';

export class PropValueValue<TValue = any> {
  type: PropValueType.VALUE = PropValueType.VALUE;
  value: TValue;

  constructor(value: TValue) {
    this.value = value;
  }

  toJSON(): PropValueValueJSON<TValue> {
    return {
      type: 'VALUE',
      value: this.value
    };
  }
    
  static fromJSON(json: PropValueValueJSON<any>, options:BuildPlaygroundOptions): PropValueValue {
    return new PropValueValue(json.value);
  }
}