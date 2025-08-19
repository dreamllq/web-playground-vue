import { Action } from './action';

export class ActionTry extends Action {
  tryActions: Action[] = [];
  catchActions: Action[] = [];
  finallyActions: Action[] = [];
}