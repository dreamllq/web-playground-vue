import { defineComponent, PropType, h, onMounted, onBeforeMount, onBeforeUnmount, onUnmounted } from 'vue';
import ComponentRender from './component-render.tsx';
import { Playground } from '../../models/playground.ts';
import { LifeCycle } from '../../types/component.ts';
import { useStore } from '../store.ts';

export default defineComponent((props) => {
  const { handleActions } = useStore()!;

  if (props.playground.lifeCycle[LifeCycle.BEFORE_MOUNT]) {
    onBeforeMount(() => {
      handleActions(props.playground.lifeCycle[LifeCycle.BEFORE_MOUNT]!, []);
    });
  }

  if (props.playground.lifeCycle[LifeCycle.MOUNTED]) {
    onMounted(() => {
      handleActions(props.playground.lifeCycle[LifeCycle.MOUNTED]!, []);
    });
  }

  if (props.playground.lifeCycle[LifeCycle.BEFORE_UNMOUNT]) {
    onBeforeUnmount(() => {
      handleActions(props.playground.lifeCycle[LifeCycle.BEFORE_UNMOUNT]!, []);
    });
  }

  if (props.playground.lifeCycle[LifeCycle.UNMOUNTED]) {
    onUnmounted(() => {
      handleActions(props.playground.lifeCycle[LifeCycle.UNMOUNTED]!, []);
    });
  }

  return () => props.playground.tree.map(component => h(ComponentRender, {
    component: component,
    scopeSlot: {} 
  }));
}, {
  props: {
    playground: {
      type: Object as PropType<Playground>,
      required: true
    }
  }
});