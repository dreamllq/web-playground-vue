import { Register } from 'l-play-core';
import { ProvideRegisterOptions } from '../../types/editor';

export const useRegister = (options: ProvideRegisterOptions = {}) => {
  const register = new Register();
  if (options.components) {
    Object.entries(options.components).forEach(([key, value]) => {
      register.componentRegister.register(key, value);
    });
  }

  if (options.actions) {
    Object.entries(options.actions).forEach(([key, value]) => {
      register.actionRegister.register(key, value);
    });
  }
  return { register };
};