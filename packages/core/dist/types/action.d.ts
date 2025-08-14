import { Variable } from '../models/variable';
import { Ref } from 'vue';
export interface IAction {
    handle(params: any[], options: {
        variables: Record<string, Ref>;
    }): Promise<void> | void;
    transformParams(params: any[], options: {
        variables: Record<string, Ref>;
    }): any[];
}
export declare enum ParamType {
    VARIABLE = "VARIABLE",
    VALUE = "VALUE",
    REF = "REF"
}
export type ParamVariable = {
    type: ParamType.VARIABLE;
    value: Variable;
};
export type ParamValue = {
    type: ParamType.VALUE;
    value: string | number | any[] | boolean | Record<string, any>;
};
export type ParamRef = {
    type: ParamType.REF;
    value: number;
};
export type ParamItem = ParamVariable | ParamValue | ParamRef;
