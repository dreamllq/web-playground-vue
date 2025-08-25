import { Action } from '../../models/action';


const genActionHandle = (action: Action, actions:any, args:any) => actions[action.id](...args);
export const useHandleActions = async (needHandleActions: Action[] | Action, actions, args: any[]) => {
  let _actions:Action[] = [];
  const handle:any = undefined;
  if (Array.isArray(needHandleActions)) {
    _actions = needHandleActions;
  } else {
    _actions = [needHandleActions];
  }

  for (const action of _actions) {
    await genActionHandle(action, actions, args); 
  }
};