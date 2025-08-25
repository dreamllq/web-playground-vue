import { createInjectionState } from '@vueuse/core';
import { PlaygroundJSON, Register } from 'l-play-core';
import { useRegister } from './hooks/use-register';
import { ProvideOptions } from '../types/editor';

const [useProvideStore, useStore] = createInjectionState((json: PlaygroundJSON | undefined, options: ProvideOptions = {}) => {
  const { register } = useRegister(options.register);
  
  const playground = register.fromJSON(json);

  return {
    playground,
    register 
  };
});

export {
  useProvideStore,
  useStore
};