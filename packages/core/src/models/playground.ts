import { Action } from './action';
import { Component } from './component';
import { Variable } from './variable';

export class Playground {
  containers: Component[] = [];
  variables: Variable[] = [];
  actions: Action[] = [];
}