import { Ref } from 'vue';
import { Action } from '../../models/action';
import { Playground } from '../../models/playground';
import { ActionType, ParamType } from '../../types/action';
import { ActionIf } from '../../models/action-if';
import { ActionTry } from '../../models/action-try';

export const useActions = (playground: Playground, options: {variables: Record<string, Ref>, refs: Record<string, Ref>}) => {
  const actions: Record<string, (...args: any[])=> Promise<any> | any> = {};

  const transformParamValues = (action:Action, args:any[]) => {
    const paramValues:any[] = [];
        
    action.params.forEach((param) => {
      if (param.type === ParamType.CONTEXT) { 
        paramValues.push(args[param.value]);
      } else if (param.type === ParamType.VALUE) {
        paramValues.push(param.value);
      } else {
        paramValues.push(null);
      }
    });
    return paramValues;
  };

  const functionActionHandle = (action:Action, args:any[]) => {
    const paramValues = transformParamValues(action, args);
        
    const res = action.handle(paramValues, {
      variables: options.variables,
      refs: options.refs
    });
    
    return res;
  };

  const ifActionHandle = (action:ActionIf, args:any[]) => {
    const paramValues = transformParamValues(action, args);
    const result = action.handle(paramValues, {
      variables: options.variables,
      refs: options.refs
    });

    let res:any = undefined;
    if (result) {
      const actions = action.extension.ifActions.map(id => playground.getActionById(id));
      res = handleActions(actions, args);
    } else {
      const actions = action.extension.elseActions.map(id => playground.getActionById(id));
      res = handleActions(actions, args);
    }

    return res;
  };

  const tryActionHandle = (action:ActionTry, args:any[]) => {
    let res:any = undefined;
    try {
      const actions = action.extension.tryActions.map(id => playground.getActionById(id));
      res = handleActions(actions, args);
    } catch (e) {
      const actions = action.extension.catchActions.map(id => playground.getActionById(id));
      res = handleActions(actions, args);
    } finally {
      const actions = action.extension.finallyActions.map(id => playground.getActionById(id));
      res = handleActions(actions, args);
    }

    return res;
  };

  const forActionHandle = async (action:Action, args:any[]) => {
    
  };

  playground.actions.forEach((action:Action) => {
    actions[action.id] = (...args:any) => {
      if (action.type === ActionType.FUNCTION) {
        return functionActionHandle(action, args);
      } else if (action.type === ActionType.IF) {
        return ifActionHandle(action as ActionIf, args);
      } else if (action.type === ActionType.FOR) {
        return forActionHandle(action, args);
      } else if (action.type === ActionType.TRY) {
        return tryActionHandle(action as ActionTry, args);
      }
    };
  });
  const genActionHandle = (action: Action, args:any) => actions[action.id](...args);


  const handleActions = (needHandleActions: Action[] | Action, args:any[]) => {
    let _actions:Action[] = [];
    if (Array.isArray(needHandleActions)) {
      _actions = needHandleActions;
    } else {
      _actions = [needHandleActions];
    }
    if (_actions.length === 0) return;
    
    let res:any = undefined;
    
    const exec = (list:any[], index:number) => {
      const action = list[index];
      const result = genActionHandle(action, args);
      if (result instanceof Promise) {
        if (index < list.length - 1) {
          return result.then(() => exec(list, index + 1));
        } 
      } else {
        if (index < list.length - 1) {
          return exec(list, index + 1);
        }
      }
      return result;
    };

    if (_actions.length > 0) {
      res = exec(_actions, 0);
      return res;
    } else {
      return undefined;
    }
  };

  return {
    actions,
    handleActions 
  };
};