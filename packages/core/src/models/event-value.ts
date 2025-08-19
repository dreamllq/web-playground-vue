import { EventValueJSON, PropType } from '@core/types/component';
import { Action } from './action';
import { Variable } from './variable';

export class EventValue {
  type: PropType.EVENT = PropType.EVENT;
  value: Action[] | Action;
  return?: Variable;

  constructor(value: Action[] | Action, returnVariable?: Variable) {
    this.value = value;
    this.return = returnVariable;
  }

  toJSON():EventValueJSON {
    return {
      type: 'EVENT',
      value: Array.isArray(this.value) ? this.value.map(item => ({ id: item.id })) : { id: this.value.id },
      return: this.return ? { id: this.return.id } : undefined
    };
  }
}