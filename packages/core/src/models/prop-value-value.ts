import { PropValueType, PropValueValueJSON } from '@core/types/component';

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
}