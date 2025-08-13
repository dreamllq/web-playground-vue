import { ComponentType } from '@/types/component';
import { Component } from './component';

export class Container<TRef=any, TProps=any> extends Component<TRef, TProps> {
  comList: Component[] = [];
  name: string = 'container';
  type: ComponentType = ComponentType.CONTAINER;
  constructor() {
    super();
  }

  async getComponent(): Promise<any> {
    return import('@/components/foundation/container.vue');
  }
}