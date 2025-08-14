import { Playground } from '@/models/playground';
import { ParamType } from '@/types/action';
import { createInjectionState } from '@vueuse/core';
import { ref } from 'vue';

const [useProvideStore, useStore] = createInjectionState((playground: Playground) => {
  const variables = {};
  const actions: Record<string, (...args: any[])=> Promise<any> | any> = {};
  const refs = {};

  playground.variables.forEach(variable => {
    variables[variable.id] = ref(variable.value);
  });

  playground.actions.forEach(action => {
    actions[action.id] = (...args) => {
      const gs:any[] = [];
      
      action.params.forEach((param) => {
        if (param.type === ParamType.REF) { 
          gs.push(args[param.value]);
        } else if (param.type === ParamType.VALUE) {
          gs.push(param.value);
        } else {
          gs.push(null);
        }
      });
      return action.handle(gs, { variables });
    };
  });

  return {
    playground,
    refs,
    variables,
    actions
  };
});

export { useProvideStore };
export { useStore };