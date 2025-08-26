import { ElMessage } from 'element-plus';
import { Action, ActionOptions } from 'l-play-core';
import _ from 'lodash';


type TExtension = {
  func: string;
}

export class ActionMessage extends Action<TExtension> {
  $class = 'ActionElMessage';

  constructor(name: string) {
    super(name);
    this.extension = { func: 'success' };
  }

  async handle(params: any[], options:ActionOptions) {
    const paramValues = this.transformParams(params, options);
    await ElMessage[this.extension.func](...paramValues);
  }
}