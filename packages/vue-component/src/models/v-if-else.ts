import { Component, PropValue } from 'l-play-core';
import { defineComponent, h, withDirectives } from 'vue';

type TRef = any

type TProps = {
  condition?: PropValue<boolean>
};

type TSlots = {
  default?: Component<any, any, any>[];
  else?: Component<any, any, any>[];
}

export class VIfElse extends Component<TRef, TProps, TSlots> {
  $class = 'VIfElse';
  name: string = 'v-if-else';

  async getComponent(): Promise<any> {
    return defineComponent((props, { slots }) => () => {
      if (props.condition === true) {
        if (slots.default) {
          return h(slots.default, { key: 'if' });
        }
      } else {
        if (slots.else) {
          return h(slots.else, { key: 'else' });
        }
      }
    }, {
      props: {
        condition: {
          type: Boolean,
          default: true
        }
      }
    });
  }
}