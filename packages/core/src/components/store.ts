import { createInjectionState } from '@vueuse/core';
import { Ref, ref } from 'vue';
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
  const variables: Record<string, Ref> = {};
  // const actions: Record<string, (...args: any[])=> Promise<any> | any> = {};
  const refs: Record<string, Ref> = {};
  
  playground.variables.forEach(variable => {
    variables[variable.id] = ref(variable.value);
  });

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