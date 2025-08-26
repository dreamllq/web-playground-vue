import { ComponentJSON, IComponent, PropItem, PropType, PropValueType } from '../types/component';
import { v4 as uuidv4 } from 'uuid';
import { DirectiveValue } from './directive-value';
import { PropValue } from './prop-value';
import { BuildPlaygroundOptions } from '../types/register';
import { EventValue } from './event-value';
import { ComponentConfig } from '../types/component-config';

export class Component<
  TRef = any, 
  TProps extends Record<string, PropItem> = Record<string, PropItem>, 
  TSlots extends Record<string, Component<any, any, any>[]> = Record<string, Component<any, any, any>[]>,
  TDirectives extends Record<string, DirectiveValue> = Record<string, DirectiveValue>
> implements IComponent<TProps> {
  static config: ComponentConfig = { name: 'component' };

  id: string = uuidv4();
  props: TProps = {} as TProps;
  directives: TDirectives = {} as TDirectives;
  name: string = 'component';
  ref?: TRef;
  slots: TSlots = {} as TSlots;
  $class = 'Component';
  async = true;


  constructor(name?:string) {
    if (name) {
      this.name = name;
    }
  }

  toJSON(): ComponentJSON {
    return {
      $class: this.$class,
      id: this.id,
      name: this.name,
      props: Object.entries(this.props).reduce((acc, [key, value]) => {
        acc[key] = value.toJSON();
        return acc;
      }, {}),
      directives: Object.entries(this.directives).reduce((acc, [key, value]) => {
        acc[key] = value.toJSON();
        return acc;
      }, {}),
      slots: Object.entries(this.slots).reduce((acc, [key, value]) => {
        acc[key] = value.map(v => ({ id: v.id }));
        return acc;
      }, {})
    };
  }

  fromJson(json:ComponentJSON, options:BuildPlaygroundOptions) {
    this.name = json.name;

    Object.entries(json.props).forEach(([key, value]) => {
      if (value.type === PropType.PROP) {
        (this.props as Record<string, PropItem>)[key] = PropValue.fromJSON(value, options);
      } else {
        (this.props as Record<string, PropItem>)[key] = EventValue.fromJSON(value, options);
      }
    });

    Object.entries(json.directives).forEach(([key, value]) => {
      (this.directives as Record<string, DirectiveValue>)[key] = DirectiveValue.fromJSON(value, options);
    });

    Object.entries(json.slots).forEach(([key, value]) => {
      (this.slots as Record<string, Component<any, any, any>[]>)[key] = value.map(item => {
        const component = options.components.find(c => c.id === item.id);
        if (!component) throw new Error(`Component ${item.id} not found`);
        return component;
      });
    });
  }
  getComponent(): Promise<any>|any {
    throw new Error('Method not implemented.');
  }
}