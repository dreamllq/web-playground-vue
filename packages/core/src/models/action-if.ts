import { ActionOptions, ActionType, ParamItem } from '@core/types/action';
import { Action } from './action';

export class ActionIf extends Action { 
  $class = 'ActionIf';
  condition: string = '';
  ifActions: Action[] = [];
  elseActions: Action[] = [];

  constructor(name: string) {
    super(name);
    this.type = ActionType.IF;
  }

  get async():boolean {
    return this.ifActions.some(action => action.async) || this.elseActions.some(action => action.async);
  }

  handle(params: any[], options: ActionOptions) {
    const paramValues = this.transformParams(params, options);
    const result = paramValues.reduce((acc, item) => acc && item, true);
    return result;

  }

  runCondition(paramValues: any[]):boolean {
    const result = paramValues.reduce((acc, item) => acc && item, true);
    return result;
  }

  toJSON() {
    const superJSON = super.toJSON();
    return {
      ...superJSON,
      condition: this.condition,
      ifActions: this.ifActions.map(item => ({ id: item.id })),
      elseActions: this.elseActions.map(item => ({ id: item.id }))
    };
  }
}