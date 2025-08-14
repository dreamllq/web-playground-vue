import { Component } from '@core/models/component';
import { defineAsyncComponent, defineComponent, h, PropType, ref } from 'vue';
import { useStore } from '../store';
import { PropType as ComponentPropType, PropValueType } from '@core/types/component';
import { Variable } from '@core/models/variable';
import { Action } from '@core/models/action';
import { get } from 'lodash';

const ComponentRender = defineComponent((props) => {
  const { variables, actions, refs } = useStore()!;
  const component = defineAsyncComponent(() => props.component.getComponent());
  const cProps = props.component.getProps();

  refs[props.component.id] = ref();

  return () => {
    const _props = { ref: props.component.id };
    Object.entries(cProps).forEach(([key, value]) => {
      if (value.type === ComponentPropType.PROP) {
        if (value.value.type === PropValueType.VARIABLE) {
          _props[key] = variables[(value.value.value as Variable).id].value;
        } else if (value.value.type === PropValueType.VALUE) {
          _props[key] = value.value.value;
        } else if (value.value.type === PropValueType.SLOT_CONTEXT) {
          const cScopeSlot = props.scopeSlot[value.value.value.componentId];
          _props[key] = get(cScopeSlot, value.value.value.key, undefined);
        }
      } else if (value.type === ComponentPropType.EVENT) {
        _props[key] = (...args) => {
          if (Array.isArray(value.value)) {
            value.value.reduce<null | Promise<void>>(async (acc, action) => {
              if (acc) {
                acc.then(() => {
                  if (action.async) {
                    return actions[action.id](...args);
                  } else {
                    actions[action.id](...args);
                  }
                });
              } else {
                if (action.async) {
                  return actions[action.id](...args);
                } else {
                  actions[action.id](...args);
                }
              }
            }, null);
          } else {
            actions[(value.value as Action).id](...args);
          }
        };
      }
    });

    const _slots = {};
    Object.entries(props.component.slots).forEach(([key, components]) => {
      _slots[key] = (...args) => components.map(component => {
        const scopeSlot = props.scopeSlot || {};
        scopeSlot[props.component.id] = args[0];

        return h(ComponentRender, {
          component: component as Component,
          scopeSlot: scopeSlot
        });
      });
    });

    // console.log('_props', _props);
    // console.log('_slots', _slots);
    

    return h(component, _props, _slots);
    // return h(h('div'), {}, { default: () => [h('div', { innerHTML: '1' })] });
  };
},
{
  props: {
    component: {
      type: Object as PropType<Component>,
      required: true
    },
    scopeSlot: {
      type: Object,
      default: undefined
    }
  }
});

export default ComponentRender;