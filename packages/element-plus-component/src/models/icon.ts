import { Component, EventValue, PropValue } from 'l-play-core';
import { defineComponent, h } from 'vue';
// <el-icon><Plus /></el-icon>
type TRef = InstanceType<typeof import('element-plus').ElIcon>

type TProps = {
  color?: PropValue<string>;
  size?: PropValue<string | number>;
  class?: PropValue<string>;
};

type TSlots = {
  default?: Component<any, any, any>[];
}

export class Icon extends Component<TRef, TProps, TSlots> {
  name: string = 'icon';
  icon: string = 'Plus';
  async getComponent(): Promise<any> {
    const ElIcon = (await import('element-plus')).ElIcon;
    const Icons = await import('@element-plus/icons-vue');
    return defineComponent((props) => () => h(ElIcon, {
      color: props.color,
      size: props.size,
      class: props.class
    }, { default: () => h(Icons[this.icon]) }), {
      props: {
        color: {
          type: String,
          default: undefined
        },
        size: {
          type: [String, Number],
          default: undefined
        },
        class: {
          type: String,
          default: ''
        }
      }
    });
  }
}