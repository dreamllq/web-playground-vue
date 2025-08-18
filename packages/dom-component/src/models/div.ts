import { defineComponent, h, StyleValue } from 'vue';
import { Component } from 'l-play-core';
import { PropValue } from 'l-play-core';

type TRef = any;

type TProps = {
  style?: PropValue<StyleValue>,
  innerHTML?: PropValue<string>,
  class?: PropValue<string>
}

type TSlots = {
  default?: Component[]
}

export class Div extends Component<TRef, TProps, TSlots> {
  name = 'div';

  async getComponent(): Promise<any> {
    return h('div');
  }
}