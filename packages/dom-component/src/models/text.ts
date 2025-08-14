import { defineComponent, h } from 'vue';
import { Component } from 'l-play-core';
import { PropValue } from 'l-play-core';

type TRef = any;

type TProps = {
  text: PropValue
}

export class Text extends Component<TRef, TProps> {
  name = 'text';

  async getComponent(): Promise<any> {
    return defineComponent((props) => () => props.text, {
      props: {
        text: {
          type: String,
          default: ''
        }
      }
    });
  }
}