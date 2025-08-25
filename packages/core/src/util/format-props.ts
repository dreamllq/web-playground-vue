import { Action } from '../models/action';
import { Component } from '../models/component';
import { EventValue } from '../models/event-value';
import { PropValue } from '../models/prop-value';
import { PropValueFunction } from '../models/prop-value-function';
import { PropValueSlotContext } from '../models/prop-value-slot-context';
import { PropValueValue } from '../models/prop-value-value';
import { PropValueVariable } from '../models/prop-value-variable';
import { PropValueVariableValue } from '../models/prop-value-variable-value';
import { Variable } from '../models/variable';


export const formatPropsPropVariable = <T>(variable: Variable): PropValue<T> => (new PropValue<T>(new PropValueVariable(variable)));

export const formatPropsPropVariableValue = <T>(variable: Variable, key: string): PropValue<T> => (new PropValue<T>(new PropValueVariableValue(variable, key)));

export const formatPropsPropValue = <TValue>(value: TValue): PropValue<TValue> => (new PropValue<TValue>(new PropValueValue<TValue>(value)));

export const formatPropsPropSlotContext = <T>(component: Component, key: string): PropValue<T> => (new PropValue<T>(new PropValueSlotContext(component, key)));

export const formatPropsPropFunction = <T>(value: (Action[] | Action), returnVariable?: Variable): PropValue<T> => (new PropValue<T>(new PropValueFunction(value, returnVariable)));

export const formatPropsEvent = (value: (Action[] | Action), returnVariable?: Variable): EventValue => (new EventValue(value, returnVariable));