import { ComponentId, ComponentType, IComponent, PropItem } from '@/types/component';
import { v4 as uuidv4 } from 'uuid';

export class Component<TRef = any, TProps = Record<string, PropItem>, TSlots = Record<string, Component<any, any, any>[]>> implements IComponent<TProps> {
  getProps(): TProps {
    return this.props;
  }
  
  async getComponent(): Promise<any> {
    return import('@/components/foundation/component.vue');
  }

  id: ComponentId = uuidv4();
  type: ComponentType = ComponentType.COMPONENT;
  props: TProps = {} as TProps;
  name: string = 'component';
  ref?: TRef;
  slots: TSlots = {} as TSlots;
}