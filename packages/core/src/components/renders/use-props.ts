import { Component } from '@core/models/component';
import { PropItem } from '@core/types/component';
import { ref } from 'vue';
import { PropType as ComponentPropType, PropValueFunction, PropValueType } from '@core/types/component';
import { Variable } from '@core/models/variable';
import { get } from 'lodash';
import { useStore } from '../store';

export const useProps = (props: {component: Component, scopeSlot: any}) => { 
  const {
    variables, actions, refs, bus, handleActions
  } = useStore()!;

  refs[props.component.id] = ref();
  const calculate = () => {
    const renderKey = ref(0);
    const forceRerender = () => {
      renderKey.value += 1; // 改变 key，强制组件重新创建
    };

    const _props = {
      ref: refs[props.component.id],
      key: renderKey.value
    };
    
    Object.entries(props.component.props).forEach(([key, value]) => {
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
          _props[key] = async (...args) => {
            await handleActions(value.value.value, args);
            if ((value.value as PropValueFunction).return) {
              return variables[(value.value as PropValueFunction).return!.id].value;
            }
          };
        }
      } else if (value.type === ComponentPropType.EVENT) {
        _props[key] = async (...args) => {
          await handleActions(value.value, args);
        };
      }
    });

    return _props;
  };

  return { calculate };
};