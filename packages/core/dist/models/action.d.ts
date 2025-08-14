import { Variable } from './variable';
import { IAction, ParamItem } from '../types/action';
import { Ref } from 'vue';
export declare class Action implements IAction {
    id: string;
    name: string;
    params: ParamItem[];
    returnVariable?: Variable;
    async: boolean;
    constructor(name: string);
    transformParams(params: any[], options: {
        variables: Record<string, Ref>;
    }): any[];
    handle(params: any[], options: {
        variables: Record<string, Ref>;
    }): Promise<void> | void;
}
