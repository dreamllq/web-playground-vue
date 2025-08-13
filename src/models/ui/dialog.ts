import { Container } from '../foundation/container';

export class Dialog extends Container {
  name: string = 'dialog';

  async getComponent(): Promise<any> {
    const ElementPlus = await import('element-plus');
    return ElementPlus.ElDialog;
  }
}