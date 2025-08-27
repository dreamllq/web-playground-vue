import { PlaygroundJSON } from '../types/playground';
import { Action } from './action';
import { Component } from './component';
import { Variable } from './variable';

interface Constructor<T = any> {
  new (...args: any[]): T; // `new` 关键字表示这是一个构造函数
}
export class Playground {
  tree: Component[] = [];
  components: Component[] = [];
  variables: Variable[] = [];
  actions: Action[] = [];

  var(name: string, value: any) {
    const _var = new Variable(name, value);
    this.variables.push(_var);
    return _var;
  }

  action<T extends Action>(t:Constructor<T>, name: string): T {
    const _t = new t(name);
    this.actions.push(_t);
    return _t;
  }

  component<T extends Component>(t: Constructor<T>, name?:string): T {
    const _t = new t(name);
    this.components.push(_t);
    return _t;
  }

  getVariableById(id:string):Variable {
    const variable = this.variables.find(v => v.id === id);
    if (!variable) throw new Error(`Variable ${id} not found`);
    return variable;
  }

  getActionById(id: string):Action {
    const action = this.actions.find(a => a.id === id);
    if (!action) throw new Error(`Action ${id} not found`);
    return action;
  }

  getComponentById(id: string):Component {
    const component = this.components.find(c => c.id === id);
    if (!component) throw new Error(`Component ${id} not found`);
    return component;
  }

  toJSON():PlaygroundJSON {
    return {
      tree: this.tree.map(item => ({ id: item.id })),
      components: this.components.map(item => item.toJSON()),
      actions: this.actions.map(item => item.toJSON()),
      variables: this.variables.map(item => item.toJSON())
    };
  }
}