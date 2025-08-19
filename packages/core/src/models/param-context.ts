import { ParamContextJSON, ParamType } from '@core/types/action';
import { BuildPlaygroundOptions } from '@core/types/register';

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
    
  static fromJSON(json: ParamContextJSON, options:BuildPlaygroundOptions): ParamContext {
    return new ParamContext(json.value);
  }
}