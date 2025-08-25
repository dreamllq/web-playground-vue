import { ref, resolveDirective } from 'vue';
import { get } from 'lodash';
import { useStore } from '../store';
import { Component } from '../../models/component';
import { PropValueType } from '../../types/component';
import { Variable } from '../../models/variable';

export const useDirectives = (props: {component: Component, scopeSlot: any}) => { 
  const {
    variables, actions, refs, bus, handleActions
  } = useStore()!;

  const calculate = () => {
    const _directives:any[] = [];
    
    Object.entries(props.component.directives).forEach(([key, value]) => {
      const _d = resolveDirective(key);
      if (!_d) return;
      let val: any = '';
      if (value.value.type === PropValueType.VARIABLE) {
        val = variables[(value.value.value as Variable).id].value;
      } else if (value.value.type === PropValueType.VARIABLE_VALUE) {
        const variable = variables[(value.value.value as Variable).id];
        val = get(variable.value, value.value.key, undefined);
      } else if (value.value.type === PropValueType.VALUE) {
        val = value.value.value;
      }
    
      _directives.push([_d, val]);
    });
    return _directives;
  };

  return { calculate };
};