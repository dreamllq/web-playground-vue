import { ActionJSON } from './action';
import { ComponentJSON } from './component';
import { VariableJSON } from './variable';

export type PlaygroundJSON = {
  tree: {id: string}[],
  components: ComponentJSON[],
  actions: ActionJSON<any>[],
  variables: VariableJSON[]
}