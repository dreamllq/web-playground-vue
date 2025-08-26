import { h, ref } from 'vue';
import { useStore } from '../store';
import ComponentRender from './component-render';
import { Component } from '../../models/component';
import { cloneDeep } from 'lodash';

export const useSlots = (props: {component: Component, scopeSlot: any}) => { 
  const {
    variables, actions, refs, bus, handleActions
  } = useStore()!;

  const calculate = () => {
    const _slots = {};
    Object.entries(props.component.slots).forEach(([key, components]) => {
      _slots[key] = (...args:any[]) => components.map(component => {
            
        // const scopeSlot = props.scopeSlot || {};
        const scopeSlot = cloneDeep(props.scopeSlot || {});
        if (args[0] && Object.keys(args[0]).length > 0) {
          scopeSlot[props.component.id] = args[0];
        }
        
        // bus.emit(`slot-${props.component.id}-change`);
    
        return h(ComponentRender, {
          component: component as Component,
          scopeSlot: scopeSlot
        });
      });
    });

    return _slots;
  };

  return { calculate };
};