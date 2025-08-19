import { ParamType } from '@core/types/action';
import { Variable } from './variable';

export class ParamVariable {
  type: ParamType.VARIABLE = ParamType.VARIABLE;
  value: Variable; 

  constructor(value: Variable) {
    this.value = value;
  }
}