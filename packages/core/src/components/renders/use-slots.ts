import { Component } from '@core/models/component';
import { h, ref } from 'vue';
import { useStore } from '../store';
import ComponentRender from './component-render';

export const useSlots = (props: {component: Component, scopeSlot: any}) => { 
  const {
    variables, actions, refs, bus, handleActions
  } = useStore()!;

  const calculate = () => {
    const _slots = {};
    Object.entries(props.component.slots).forEach(([key, components]) => {
      _slots[key] = (...args:any[]) => components.map(component => {
        bus.emit(`slot-${props.component.id}-change`);
            
        const scopeSlot = props.scopeSlot || {};
        scopeSlot[props.component.id] = args[0];
    
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