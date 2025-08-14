import { Action } from 'l-play-core';
import { Ref } from 'vue';

export class ActionCallback extends Action {
  callback?: string;
  constructor(name: string) {
    super(name);
  }

  handle(params: any[], options: { variables: Record<string, Ref>; }): Promise<void> | void {
    
  }
}