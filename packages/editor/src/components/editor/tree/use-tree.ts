import { Component } from 'l-play-core';
import { useStore } from '../../store';
import { v4 as uuidv4 } from 'uuid';

export const useTree = () => {
  const { playground } = useStore()!;

  const calculateComponent = (component: Component) => {
    const props = {
      id: uuidv4(),
      label: 'props',
      data: {
        type: 'props',
        data: component.props
      },
      children: Object.entries(component.props).map(([key, value]) => ({
        id: uuidv4(),
        label: key,
        data: {
          type: 'prop',
          data: value
        }
      }))
    };

    const directives = {
      id: uuidv4(),
      label: 'directives',
      data: {
        type: 'directives',
        data: component.directives
      },
      children: Object.entries(component.directives).map(([key, value]) => ({
        id: uuidv4(),
        label: key,
        data: {
          type: 'directive',
          data: value
        }
      }))
    };

    const slots = {
      id: uuidv4(),
      label: 'slots',
      data: {
        type: 'slots',
        data: component.slots
      },
      children: Object.entries(component.slots).map(([key, value]) => ({
        id: uuidv4(),
        label: key,
        data: {
          type: 'slot',
          data: value
        },
        children: value.map(slot => calculateComponent(slot))
      }))
    };

    return {
      id: uuidv4(),
      label: component.name,
      data: {
        type: 'component',
        data: component
      },
      children: [
        ...(props.children.length > 0 ? [props] : []),
        ...(directives.children.length > 0 ? [directives] : []),
        ...(slots.children.length > 0 ? [slots] : [])
      ]
    };
  };

  return { calculateComponent };
};