import { Action } from 'l-play-core';
import { Ref } from 'vue';

export class ActionFetch extends Action { 
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  body?:any;
  constructor(name: string) {
    super(name);
    this.async = true;
  }

  handle(params: any[], options: { variables: Record<string, Ref>; }): Promise<void> {
    return new Promise((resolve, reject) => { 
      const request = new Request(this.url!, {
        method: this.method || 'GET',
        body: this.body || undefined,
        headers: this.headers || {}
      });
      fetch(request)
        .then(request => request.json())
        .then(data => {
          resolve(data);
        });
    });
  }
}