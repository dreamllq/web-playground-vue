import { Action, ActionOptions } from 'l-play-core';
import { extensionSchema } from './action-fetch.schema';
import { urlStringify } from 'simple-url-stringify';

type TExtension = {
  url?:string,
  method?:string,
  headers?:Record<string, string>
  body?:any,
  query?:Record<string, any>
  params?:Record<string, any>
}

export class ActionFetch extends Action<TExtension> { 
  static extensionSchema = extensionSchema;
  $class = 'ActionFetch';

  handle(params: any[], options: ActionOptions): Promise<void> {
    return new Promise((resolve, reject) => { 
      const url = urlStringify({
        url: this.extension.url!,
        params: this.extension.params,
        query: this.extension.query
      });
      
      const request = new Request(url, {
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