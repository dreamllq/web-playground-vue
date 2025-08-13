import { defineComponent, PropType, h } from 'vue';
import { Playground } from '@/models/foundation/playground';
import ContainerRender from './container-render.tsx';
import { Container } from '@/models/foundation/container.ts';

export default defineComponent((props) => () => props.playground.containers.map(container => h(ContainerRender, { container: container as Container })), {
  props: {
    playground: {
      type: Object as PropType<Playground>,
      required: true
    }
  }
});