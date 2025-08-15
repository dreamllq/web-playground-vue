import { Component } from '@core/models/component';
import { defineAsyncComponent, defineComponent, h, PropType, ref } from 'vue';
import { useStore } from '../store';
import { PropType as ComponentPropType, PropValueFunction, PropValueType } from '@core/types/component';
import { Variable } from '@core/models/variable';
import { Action } from '@core/models/action';
import { get } from 'lodash';

const ComponentRender = defineComponent((props) => {
  const {
    variables, actions, refs, bus 
  } = useStore()!;
  const component = defineAsyncComponent(() => props.component.getComponent());
  const cProps = props.component.getProps();
  refs[props.component.id] = ref();

  return () => {
    const renderKey = ref(0);
    const forceRerender = () => {
      renderKey.value += 1; // 改变 key，强制组件重新创建
    };

    const _props = {
      ref: refs[props.component.id],
      _key: renderKey.value
    };
    Object.entries(cProps).forEach(([key, value]) => {
      if (value.type === ComponentPropType.PROP) {
        if (value.value.type === PropValueType.VARIABLE) {
          _props[key] = variables[(value.value.value as Variable).id].value;
        } else if (value.value.type === PropValueType.VARIABLE_VALUE) {
          const variable = variables[(value.value.value as Variable).id];
          _props[key] = get(variable.value, value.value.key, undefined);
        } else if (value.value.type === PropValueType.VALUE) {
          _props[key] = value.value.value;
        } else if (value.value.type === PropValueType.SLOT_CONTEXT) {
          const cScopeSlot = props.scopeSlot[value.value.value.componentId];
          _props[key] = get(cScopeSlot, value.value.value.key, undefined);
          bus.once(`slot-${value.value.value.componentId}-change`, () => {
            forceRerender();
          });
        } else if (value.value.type === PropValueType.FUNCTION) {
          _props[key] = (...args) => {
            if (Array.isArray(value.value.value)) {
              return value.value.value.reduce<null | Promise<void>>(async (acc, action) => {
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
              }, null)?.then(() => {
                if ((value.value as PropValueFunction).return) {
                  return actions[((value.value as PropValueFunction).return as Action).id](...args);
                }
              });
            } else {
              actions[(value.value.value as Action).id](...args);
              if ((value.value as PropValueFunction).return) {
                return actions[((value.value as PropValueFunction).return as Action).id](...args);
              }
            }
          };
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
        bus.emit(`slot-${props.component.id}-change`);
        
        const scopeSlot = props.scopeSlot || {};
        scopeSlot[props.component.id] = args[0];

        return h(ComponentRender, {
          component: component as Component,
          scopeSlot: scopeSlot
        });
      });
    });

    // console.log(props.component.name, '_props', _props);
    // console.log(props.component.name, '_slots', _slots);
    

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