import { Action, ActionOptions } from 'l-play-core';
import { Parser } from 'expr-eval';
import { extensionSchema } from './action-operator.schema';

type TExtension = {
  operator?:string;
}

export class ActionOperator extends Action<TExtension> { 
  $class = 'ActionOperator';
  static extensionSchema = extensionSchema;

  constructor(name: string) {
    super(name);
    this.extension = { operator: '' };
  }

  handle(params: any[], options:ActionOptions): void {
    if (this.params.length > 0) {
      const paramValues = this.transformParams(params, options);
      
      if (this.extension.operator) {
        const result = calculateSafe(paramValues, this.extension.operator);
        this.setResultData(params, options, result);
        return result;
      } else {
        this.setResultData(params, options, paramValues[0]);
        return paramValues[0];
      }
    }
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