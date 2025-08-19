import { Action } from '../action';

interface Constructor<T = any> {
  new (...args: any[]): T; // `new` 关键字表示这是一个构造函数
}

export class ActionRegister {
  map: Map<string, Constructor<Action>> = new Map();

  register(name: string, action: Constructor<Action>) {
    this.map.set(name, action);
  }
}