import { defineAsyncComponent, defineComponent, h, PropType } from 'vue';
import { ComponentType } from '@/types/component';
import ComponentRender from './component-render.tsx';
import { Container } from '@/models/foundation/container.ts';
import { Component } from '@/models/foundation/component.ts';

const ContainerRender = defineComponent((props) => {
  const component = defineAsyncComponent(() => props.container.getComponent());
  const cProps = props.container.getProps();

  return () => h(component, cProps, () => props.container.comList.map(com => {
    if (com.type === ComponentType.CONTAINER) {
      return h(ContainerRender, { container: com as Container });
    } else if (com.type === ComponentType.COMPONENT) {
      return h(ComponentRender, { component: com as Component });
    }
  }));
},
{
  props: {
    container: {
      type: Object as PropType<Container>,
      required: true
    }
  } 
});

export default ContainerRender;