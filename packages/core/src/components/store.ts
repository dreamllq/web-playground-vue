import { createInjectionState } from '@vueuse/core';
import { ref } from 'vue';
import EventEmitter from 'eventemitter3';
import { useActions } from './hooks/use-actions';
import { Playground } from '../models/playground';


const [useProvideStore, useStore] = createInjectionState((playground: Playground) => {
  const ee = new EventEmitter();
  const bus = {
    emit: ee.emit.bind(ee),
    on: ee.on.bind(ee),
    once: ee.once.bind(ee),
    off: ee.off.bind(ee) 
  };
  const variables = {};
  // const actions: Record<string, (...args: any[])=> Promise<any> | any> = {};
  const refs = {};
  
  playground.variables.forEach(variable => {
    variables[variable.id] = ref(variable.value);
  });

  // playground.actions.forEach(action => {
  //   actions[action.id] = (...args) => {
  //     const gs:any[] = [];
      
  //     action.params.forEach((param) => {
  //       if (param.type === ParamType.CONTEXT) { 
  //         gs.push(args[param.value]);
  //       } else if (param.type === ParamType.VALUE) {
  //         gs.push(param.value);
  //       } else {
  //         gs.push(null);
  //       }
  //     });
      
  //     return action.handle(gs, {
  //       variables,
  //       refs
  //     });
  //   };
  // });

  const { actions, handleActions } = useActions(playground, {
    variables,
    refs 
  });

  return {
    playground,
    refs,
    variables,
    actions,
    bus,
    handleActions
  };
});

export { useProvideStore };
export { useStore };