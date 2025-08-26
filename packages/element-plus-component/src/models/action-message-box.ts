import { ElMessageBox } from 'element-plus';
import { Action, ActionOptions } from 'l-play-core';
import _ from 'lodash';


type TExtension = {
  func: string;
}

export class ActionMessageBox extends Action<TExtension> {
  $class = 'ActionElMessageBox';

  constructor(name: string) {
    super(name);
    this.extension = { func: 'confirm' };
  }

  async handle(params: any[], options:ActionOptions) {
    const paramValues = this.transformParams(params, options);
    await ElMessageBox[this.extension.func](...paramValues);
  }
}