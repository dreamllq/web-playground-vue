import { PropValueType, PropValueValueJSON } from '@core/types/component';
import { BuildPlaygroundOptions } from '@core/types/register';

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