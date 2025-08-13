import { defineComponent, h, StyleValue } from 'vue';
import { Component } from '../foundation/component';
import { PropValue } from '@/types/component';

type TRef = any;

type TProps = {
  style?: PropValue<StyleValue>,
  innerHTML?: PropValue<string>,
}

type TSlots = {
  default?: Component[]
}

export class Span extends Component<TRef, TProps, TSlots> {
  name = 'span';

  async getComponent(): Promise<any> {
    return defineComponent(() => () => h('span'));
  }
}