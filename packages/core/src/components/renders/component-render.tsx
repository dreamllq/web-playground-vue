import { defineAsyncComponent, defineComponent, h, PropType, withDirectives } from 'vue';
import { useProps } from './use-props';
import { useDirectives } from './use-directives';
import { useSlots } from './use-slots';
import { Component } from '../../models/component';

const ComponentRender = defineComponent((props) => {
  const component = defineAsyncComponent(() => props.component.getComponent());

  const { calculate: calculateProps } = useProps(props);
  const { calculate: calculateDirectives } = useDirectives(props);
  const { calculate: calculateSlots } = useSlots(props);

  return () => {
    const _props = calculateProps();
    const _directives = calculateDirectives();
    const _slots = calculateSlots();

    // console.log(props.component.name, '_props', _props);
    // console.log(props.component.name, '_slots', _slots);
    // console.log(props.component.name, '_directives', _directives);
    
    return _directives.length > 0 
      ? withDirectives(h(component, _props, _slots), _directives) 
      : h(component, _props, _slots);
  };
},
{
  props: {
    component: {
      type: Object as PropType<Component>,
      required: true
    },
    scopeSlot: {
      type: Object,
      default: undefined
    }
  }
});

export default ComponentRender;