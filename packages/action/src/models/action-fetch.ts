import { Action, BuildPlaygroundOptions } from 'l-play-core';
import { Ref } from 'vue';

export class ActionFetch extends Action { 
  $class = 'ActionFetch';
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
          this.setResultData(params, options, data);
          resolve(data);
        });
    });
  }

  toJSON() {
    const superJSON = super.toJSON();
    return {
      ...superJSON,
      url: this.url,
      method: this.method,
      body: this.body,
      headers: this.headers
    };
  }

  fromJSON(json: ReturnType<typeof ActionFetch.prototype['toJSON']>, options: BuildPlaygroundOptions) {
    super.fromJSON(json, options);
    this.url = json.url;
    this.method = json.method;
    this.body = json.body;
    this.headers = json.headers;
  }
}