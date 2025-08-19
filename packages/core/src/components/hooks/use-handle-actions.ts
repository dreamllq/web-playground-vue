import { Action } from '@core/models/action';
import { useStore } from '../store';


const genActionHandle = (action: Action, actions:any, args:any) => actions[action.id](...args);
export const useHandleActions = async (needHandleActions: Action[] | Action, actions, args: any[]) => {
  // const { actions } = useStore()!;
  let _actions:Action[] = [];
  const handle:any = undefined;
  if (Array.isArray(needHandleActions)) {
    _actions = needHandleActions;
  } else {
    _actions = [needHandleActions];
  }

  // const isAsync = _actions.some(item => item.async) ;

  // if (isAsync) {
  //   handle = async (...args) => {
  //     for (const action of _actions) {
  //       if (action.async) {
  //         await genActionHandle(action, actions, args); 
  //       } else {
  //         genActionHandle(action, actions, args); 
  //       }
  //     }
  // if (returnAction) {
  //   return actions[returnAction.id](...args);
  // }
  // };
  // } else {
  // handle = async (...args) => {
  for (const action of _actions) {
    await genActionHandle(action, actions, args); 
  }
  // if (returnAction) {
  //   return actions[returnAction.id](...args);
  // }
  // };
  // }

  // return {
  //   handle
  //   // isAsync
  // };
};