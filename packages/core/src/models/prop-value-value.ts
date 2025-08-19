import { PropValueType } from '@core/types/component';

export class PropValueValue<TValue = any> {
  type: PropValueType.VALUE = PropValueType.VALUE;
  value: TValue;

  constructor(value: TValue) {
    this.value = value;
  }
}