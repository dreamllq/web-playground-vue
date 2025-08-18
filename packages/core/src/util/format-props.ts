import { Action } from '@core/models/action';
import { Variable } from '@core/models/variable';
import { EventValue, PropType, PropValue, PropValueType, PropValueVariable } from '@core/types/component';

export const formatPropsPropVariable = <T>(variable: Variable): PropValue<T> => ({
  type: PropType.PROP,
  value: {
    type: PropValueType.VARIABLE,
    value: variable
  }
});

export const formatPropsPropVariableValue = <T>(variable: Variable, key: string): PropValue<T> => ({
  type: PropType.PROP,
  value: {
    type: PropValueType.VARIABLE_VALUE,
    value: variable,
    key
  }
});

export const formatPropsPropValue = <TValue>(value: TValue): PropValue<TValue> => ({
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value
  }
});

export const formatPropsPropSlotContext = <T>(componentId: string, key: string): PropValue<T> => ({
  type: PropType.PROP,
  value: {
    type: PropValueType.SLOT_CONTEXT,
    value: {
      componentId,
      key
    }
  }
});

export const formatPropsPropFunction = <T>(value: (Action[] | Action), returnAction?: Action): PropValue<T> => ({
  type: PropType.PROP,
  value: {
    type: PropValueType.FUNCTION,
    value: value,
    return: returnAction
  }
});

export const formatPropsEvent = (value: (Action[] | Action), returnAction?: Action): EventValue => ({
  type: PropType.EVENT,
  value: value,
  return: returnAction
});