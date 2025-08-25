import { ActionResultVariable } from '../models/action-result-variable';
import { ActionResultVariableValue } from '../models/action-result-variable-value';
import { ParamContext } from '../models/param-context';
import { ParamValue } from '../models/param-value';
import { ParamVariable } from '../models/param-variable';
import { ParamVariableValue } from '../models/param-variable-value';
import { Variable } from '../models/variable';
import { ActionResult, ParamItem } from '../types/action';

export const formatActionParamVariable = (value: Variable): ParamItem => (new ParamVariable(value));
export const formatActionParamVariableValue = (value: Variable, key: string): ParamItem => (new ParamVariableValue(value, key));

export const formatActionParamValue = (value: any): ParamItem => (new ParamValue(value));

export const formatActionParamContext = (value: number): ParamItem => (new ParamContext(value));

export const formatActionResultVariable = (value: Variable): ActionResult => (new ActionResultVariable(value));

export const formatActionResultVariableValue = (value: Variable, key: string): ActionResult => (new ActionResultVariableValue(value, key));