import { ParamContextJSON, ParamType } from '../types/action';
import { BuildPlaygroundOptions } from '../types/register';

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