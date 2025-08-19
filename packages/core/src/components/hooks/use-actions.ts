import { Action } from '@core/models/action';
import { ActionIf } from '@core/models/action-if';
import { ActionTry } from '@core/models/action-try';
import { Playground } from '@core/models/playground';
import { ActionType, ParamType } from '@core/types/action';
import { Ref } from 'vue';

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

  const functionActionHandle = async (action:Action, args:any[]) => {
    const paramValues = transformParamValues(action, args);
        
    return action.handle(paramValues, {
      variables: options.variables,
      refs: options.refs
    });
  };

  const ifActionHandle = async (action:ActionIf, args:any[]) => {
    const paramValues = transformParamValues(action, args);
    const result = action.handle(paramValues, {
      variables: options.variables,
      refs: options.refs
    });

    if (result) {
      await handleActions(action.ifActions, args);
    } else {
      await handleActions(action.elseActions, args);
    }
  };

  const tryActionHandle = async (action:ActionTry, args:any[]) => {
    try {
      await handleActions(action.tryActions, args);
    } catch (e) {
      await handleActions(action.catchActions, args);
    } finally {
      await handleActions(action.finallyActions, args);
    }
  };

  const forActionHandle = async (action:Action, args:any[]) => {
    
  };

  playground.actions.forEach((action:Action) => {
    actions[action.id] = async (...args:any) => {
      if (action.type === ActionType.FUNCTION) {
        await functionActionHandle(action, args);
      } else if (action.type === ActionType.IF) {
        await ifActionHandle(action as ActionIf, args);
      } else if (action.type === ActionType.FOR) {
        await forActionHandle(action, args);
      } else if (action.type === ActionType.TRY) {
        await tryActionHandle(action as ActionTry, args);
      }
    };
  });
  const genActionHandle = (action: Action, args:any) => actions[action.id](...args);

  const handleActions = async (needHandleActions: Action[] | Action, args:any[]) => {
    let _actions:Action[] = [];
    if (Array.isArray(needHandleActions)) {
      _actions = needHandleActions;
    } else {
      _actions = [needHandleActions];
    }
    if (_actions.length === 0) return;
    
    for (const action of _actions) {
      await genActionHandle(action, args); 
    }
  };

  return {
    actions,
    handleActions 
  };
};