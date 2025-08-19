import { Action } from './action';

export class ActionTry extends Action {
  $class = 'ActionTry';
  tryActions: Action[] = [];
  catchActions: Action[] = [];
  finallyActions: Action[] = [];

  toJSON() {
    const superJSON = super.toJSON();
    return {
      ...superJSON,
      tryActions: this.tryActions.map(item => ({ id: item.id })),
      catchActions: this.catchActions.map(item => ({ id: item.id })),
      finallyActions: this.finallyActions.map(item => ({ id: item.id }))
    };
  }
}