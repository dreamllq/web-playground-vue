import { Component, PropValue } from 'l-play-core';
import { defineComponent, h, withDirectives } from 'vue';

type TRef = any

type TProps = {
  array?: PropValue<any[]>
};

type TSlots = {
  default?: Component<any, any, any>[];
}

export class VFor extends Component<TRef, TProps, TSlots> {
  $class = 'VFor';

  async getComponent(): Promise<any> {
    return defineComponent((props, { slots }) => () => props.array.map(item => slots.default ? slots.default({ data: item }) : ''), {
      props: {
        array: {
          type: Array,
          default: () => ([])
        }
      }
    });
  }
}