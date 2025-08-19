import { Action } from '../action';
import { Component } from '../component';

interface Constructor<T = any> {
  new (...args: any[]): T; // `new` 关键字表示这是一个构造函数
}

export class ComponentRegister {
  map: Map<string, Constructor<Component>> = new Map();

  register(name: string, component: Constructor<Component>) {
    this.map.set(name, component);
  }
}