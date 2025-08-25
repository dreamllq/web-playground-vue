import { defineComponent, PropType, h } from 'vue';
import ComponentRender from './component-render.tsx';
import { Playground } from '../../models/playground.ts';

export default defineComponent((props) => () => props.playground.tree.map(component => h(ComponentRender, {
  component: component,
  scopeSlot: {} 
})), {
  props: {
    playground: {
      type: Object as PropType<Playground>,
      required: true
    }
  }
});