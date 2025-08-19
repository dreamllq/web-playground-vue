import { Action } from '@core/models/action';
import { Component } from '@core/models/component';
import { EventValue } from '@core/models/event-value';
import { PropValue } from '@core/models/prop-value';
import { PropValueFunction } from '@core/models/prop-value-function';
import { PropValueSlotContext } from '@core/models/prop-value-slot-context';
import { PropValueValue } from '@core/models/prop-value-value';
import { PropValueVariable } from '@core/models/prop-value-variable';
import { PropValueVariableValue } from '@core/models/prop-value-variable-value';
import { Variable } from '@core/models/variable';

export const formatPropsPropVariable = <T>(variable: Variable): PropValue<T> => (new PropValue<T>(new PropValueVariable(variable)));

export const formatPropsPropVariableValue = <T>(variable: Variable, key: string): PropValue<T> => (new PropValue<T>(new PropValueVariableValue(variable, key)));

export const formatPropsPropValue = <TValue>(value: TValue): PropValue<TValue> => (new PropValue<TValue>(new PropValueValue<TValue>(value)));

export const formatPropsPropSlotContext = <T>(component: Component, key: string): PropValue<T> => (new PropValue<T>(new PropValueSlotContext(component, key)));

export const formatPropsPropFunction = <T>(value: (Action[] | Action), returnVariable?: Variable): PropValue<T> => (new PropValue<T>(new PropValueFunction(value, returnVariable)));

export const formatPropsEvent = (value: (Action[] | Action), returnVariable?: Variable): EventValue => (new EventValue(value, returnVariable));