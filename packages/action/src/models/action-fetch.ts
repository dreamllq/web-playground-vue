import { Action } from 'l-play-core';

export class ActionFetch extends Action { 
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  constructor(name: string) {
    super(name);
  }
}