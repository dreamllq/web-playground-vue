import { ComponentJSON, IComponent, PropItem, PropType, PropValueType } from '@core/types/component';
import { v4 as uuidv4 } from 'uuid';
import { DirectiveValue } from './directive-value';

export class Component<
  TRef = any, 
  TProps extends Record<string, PropItem> = Record<string, PropItem>, 
  TSlots extends Record<string, Component<any, any, any>[]> = Record<string, Component<any, any, any>[]>,
  TDirectives extends Record<string, DirectiveValue> = Record<string, DirectiveValue>
> implements IComponent<TProps> {

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
  getComponent(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  id: string = uuidv4();
  props: TProps = {} as TProps;
  directives: TDirectives = {} as TDirectives;
  name: string = 'component';
  ref?: TRef;
  slots: TSlots = {} as TSlots;
  $class = 'Component';
}