import { Container } from '../foundation/container';

export class Form extends Container {
  name: string = 'form';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElForm;
  }
}