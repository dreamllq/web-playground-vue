import { ParamContextJSON, ParamType } from '@core/types/action';

export class ParamContext {
  type: ParamType.CONTEXT = ParamType.CONTEXT;
  value: number; 

  constructor(value: number) {
    this.value = value;
  }

  toJSON(): ParamContextJSON {
    return {
      type: 'CONTEXT',
      value: this.value
    };
  }
}