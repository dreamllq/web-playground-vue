import { ComponentId, ComponentType, DirectiveValue, IComponent, PropItem, PropValue } from '@core/types/component';
import { v4 as uuidv4 } from 'uuid';

export class Component<
  TRef = any, 
  TProps extends Record<string, PropItem> = Record<string, PropItem>, 
  TSlots extends Record<string, Component<any, any, any>[]> = Record<string, Component<any, any, any>[]>,
  TDirectives extends Record<string, DirectiveValue> = Record<string, DirectiveValue>
> implements IComponent<TProps> {
  getComponent(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  id: ComponentId = uuidv4();
  type: ComponentType = ComponentType.COMPONENT;
  props: TProps = {} as TProps;
  directives: TDirectives = {} as TDirectives;
  name: string = 'component';
  ref?: TRef;
  slots: TSlots = {} as TSlots;
}