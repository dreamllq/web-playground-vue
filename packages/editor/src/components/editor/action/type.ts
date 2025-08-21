import { ActionResultType, ParamType } from 'l-play-core';

export type ActionFormParam = {
  type: ParamType;
  variable?:string;
  value?: string;
  context?: number;
}

export type ActionFormResult = {
  type?: ActionResultType;
  variable?: string;
  key?: string;
}

export type ActionForm = {
    action: string,
    name: string,
    params: ActionFormParam[],
    result?: ActionFormResult 
    async: boolean
}