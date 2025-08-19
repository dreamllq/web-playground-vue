import { ComponentType, IComponent, PropItem, PropType, PropValueType } from '@core/types/component';
import { v4 as uuidv4 } from 'uuid';
import { DirectiveValue } from './directive-value';

export class Component<
  TRef = any, 
  TProps extends Record<string, PropItem> = Record<string, PropItem>, 
  TSlots extends Record<string, Component<any, any, any>[]> = Record<string, Component<any, any, any>[]>,
  TDirectives extends Record<string, DirectiveValue> = Record<string, DirectiveValue>
> implements IComponent<TProps> {

  propsToJSON() {
    const json = {};
    Object.entries(this.props).forEach(([key, value]) => {
      if (value.type === PropType.PROP) {
        if (value.value.type === PropValueType.FUNCTION) {
          json[key] = {
            type: PropValueType.FUNCTION as keyof typeof PropValueType,
            value: Array.isArray(value.value.value) ? value.value.value.map(item => item.toJSON()) : value.value.value.toJSON(),
            return: value.value.return ? value.value.return.toJSON() : undefined
          };
        } 
      }
    });
    return json;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type as keyof typeof ComponentType,
      props: this.propsToJSON()
    };
  }
  getComponent(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  id: string = uuidv4();
  type: ComponentType = ComponentType.COMPONENT;
  props: TProps = {} as TProps;
  directives: TDirectives = {} as TDirectives;
  name: string = 'component';
  ref?: TRef;
  slots: TSlots = {} as TSlots;
}