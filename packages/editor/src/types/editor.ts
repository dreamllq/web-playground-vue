export interface Constructor<T = any> {
  new (...args: any[]): T; // `new` 关键字表示这是一个构造函数
}

export type ProvideRegisterOptions ={
  components?: Record<string, Constructor>;
  actions?: Record<string, Constructor>;
}

export type ProvideOptions = {
  register?: ProvideRegisterOptions
}