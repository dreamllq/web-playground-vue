import { ActionResultVariable } from '@core/models/action-result-variable';
import { ActionResultVariableValue } from '@core/models/action-result-variable-value';
import { ParamContext } from '@core/models/param-context';
import { ParamValue } from '@core/models/param-value';
import { ParamVariable } from '@core/models/param-variable';
import { Variable } from '@core/models/variable';
import { ActionResult, ActionResultType, ParamItem, ParamType } from '@core/types/action';


export const formatActionParamVariable = (value: Variable): ParamItem => (new ParamVariable(value));

export const formatActionParamValue = (value: any): ParamItem => (new ParamValue(value));

export const formatActionParamContext = (value: number): ParamItem => (new ParamContext(value));

export const formatActionResultVariable = (value: Variable): ActionResult => (new ActionResultVariable(value));

export const formatActionResultVariableValue = (value: Variable, key: string): ActionResult => (new ActionResultVariableValue(value, key));