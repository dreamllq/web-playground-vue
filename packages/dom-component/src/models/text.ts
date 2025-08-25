import { defineComponent, h } from 'vue';
import { Component } from 'l-play-core';
import { PropValue } from 'l-play-core';

type TRef = any;

type TProps = {
  text: PropValue
}

export class Text extends Component<TRef, TProps> {
  $class = 'Text';

  async getComponent(): Promise<any> {
    return defineComponent((props) => () => String(props.text), {
      props: {
        text: {
          type: [
            String,
            Number,
            Boolean
          ],
          default: ''
        }
      }
    });
  }
}