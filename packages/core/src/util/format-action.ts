import { Variable } from '@core/models/variable';
import { ActionResult, ActionResultType, ParamItem, ParamType } from '@core/types/action';


export const formatActionParamVariable = (value: Variable): ParamItem => ({
  type: ParamType.VARIABLE,
  value: value
});

export const formatActionParamValue = (value: any): ParamItem => ({
  type: ParamType.VALUE,
  value: value
});

export const formatActionParamContext = (value: number): ParamItem => ({
  type: ParamType.CONTEXT,
  value: value
});

export const formatActionResultVariable = (value: Variable): ActionResult => ({
  type: ActionResultType.VARIABLE,
  value: value
});

export const formatActionResultVariableValue = (value: Variable, key: string): ActionResult => ({
  type: ActionResultType.VARIABLE_VALUE,
  value: value,
  key: key
});