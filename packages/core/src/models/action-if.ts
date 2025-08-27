import { ActionIfJSON, ActionOptions, ActionType } from '../types/action';
import { Action } from './action';
import { Parser } from 'expr-eval';

type TExtension = {
  operator:string;
  ifActions: string[];
  elseActions: string[];
}

export class ActionIf extends Action<TExtension> { 
  $class = 'ActionIf';
  type = ActionType.IF;

  constructor(name: string) {
    super(name);
    this.extension = {
      operator: '',
      ifActions: [],
      elseActions: [] 
    };
  }

  handle(params: any[], options: ActionOptions) {
    const paramValues = this.transformParams(params, options);
    const result = calculateSafe(paramValues, this.extension.operator);
    return result;
  }
}

function calculateSafe(data: any[], expression:string) {
  // 将 $0, $1 映射为变量 obj.$0, obj.$1
  const obj = {};
  const _expression = expression.replace(/\$/g, '_param');

  data.forEach((val, i) => {
    obj[`_param${i}`] = val;
  });

  try {
    const ast = Parser.parse(_expression);
    return ast.evaluate(obj);
  } catch (err: any) {
    throw new Error(`表达式错误: ${err.message}`);
  }
}