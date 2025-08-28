import { ActionJSON } from './action';
import { ComponentJSON, LifeCycle } from './component';
import { VariableJSON } from './variable';

export type PlaygroundJSON = {
  tree?: {id: string}[],
  components?: ComponentJSON[],
  actions?: ActionJSON<any>[],
  variables?: VariableJSON[],
  lifeCycle?: {[key in (keyof typeof LifeCycle)]?: {id: string}[]},
}