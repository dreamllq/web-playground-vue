import { defineComponent, PropType, h } from 'vue';
import { Playground } from '@core/models/playground';
import ComponentRender from './component-render.tsx';

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