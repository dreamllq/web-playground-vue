import { ActionType } from '@core/types/action';
import { Action } from './action';

export class ActionFor extends Action {
  $class = 'ActionFor';

  constructor(name: string) {
    super(name);
    this.type = ActionType.FOR;
  } 
}