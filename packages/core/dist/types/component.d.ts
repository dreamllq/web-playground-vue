import { Action } from '../models/action';
import { Variable } from '../models/variable';
export declare enum ComponentType {
    COMPONENT = "COMPONENT",
    CONTAINER = "CONTAINER"
}
export interface IComponent<TProps> {
    getComponent(): Promise<any>;
    getProps(): TProps;
}
export type ComponentId = string;
export declare enum PropType {
    PROP = "PROP",
    EVENT = "EVENT"
}
export declare enum PropValueType {
    VARIABLE = "VARIABLE",
    VALUE = "VALUE"
}
export type PropValueVariable = {
    type: PropValueType.VARIABLE;
    value: Variable;
};
export type PropValueValue<TValue> = {
    type: PropValueType.VALUE;
    value: TValue;
};
export type PropValue<TValue = string | number | any[] | boolean | Record<string, any>> = {
    type: PropType.PROP;
    value: PropValueVariable | PropValueValue<TValue>;
};
export type EventValue = {
    type: PropType.EVENT;
    value: Action | Action[];
};
export type PropItem = PropValue<any> | EventValue;
