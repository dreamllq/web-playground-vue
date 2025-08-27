import { Action, ActionOptions } from 'l-play-core';

type TExtension = {
  url?:string,
  method?:string,
  headers?:Record<string, string>
  body?:any
}

export class ActionFetch extends Action<TExtension> { 
  $class = 'ActionFetch';

  handle(params: any[], options: ActionOptions): Promise<void> {
    return new Promise((resolve, reject) => { 
      const request = new Request(this.extension.url!, {
        method: this.extension.method || 'GET',
        body: this.extension.body || undefined,
        headers: this.extension.headers || {}
      });
      fetch(request)
        .then(request => request.json())
        .then(data => {
          this.setResultData(params, options, data);
          resolve(data);
        });
    });
  }
}