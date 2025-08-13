import { defineComponent, h } from 'vue';
import { Component } from '../foundation/component';
import { PropValue } from '@/types/component';

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