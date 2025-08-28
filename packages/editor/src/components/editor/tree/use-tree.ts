import { Component } from 'l-play-core';
import { useStore } from '../../store';
import { v4 as uuidv4 } from 'uuid';

export const useTree = () => {
  const { playground } = useStore()!;

  const calculateComponent = (component: Component, slotName?:string) => {
    const props = Object.entries(component.props).map(([key, value]) => ({
      id: uuidv4(),
      label: `props::${key}`,
      data: {
        type: 'prop',
        data: value
      }
    }));

    const directives = Object.entries(component.directives).map(([key, value]) => ({
      id: uuidv4(),
      label: `directives::${key}`,
      data: {
        type: 'directive',
        data: value
      }
    }));

    const slots = Object.entries(component.slots).reduce<any[]>((acc, [key, value]) => {
      {
        acc.push(...value.map(com => calculateComponent(com, key)));
        return acc;
      }
    }, []);

    return {
      id: uuidv4(),
      label: `${slotName ? `slots::${slotName}::` : ''}${component.name}-${component.$class}`,
      data: {
        type: 'component',
        data: component
      },
      children: [
        ...props,
        ...directives,
        ...slots
      ]
    };
  };

  const calculateLifeCycle = () => ({
    id: uuidv4(),
    label: '生命周期',
    data: {
      type: 'lifeCycleArea',
      data: playground.lifeCycle
    },
    children: Object.entries(playground.lifeCycle).map(([key, item]) => ({
      id: uuidv4(),
      label: `${key}`,
      data: {
        type: 'lifeCycle',
        data: {
          lifeCycle: key,
          actions: item 
        }
      },
      children: item.map(action => ({
        id: uuidv4(),
        label: `${action.name}-${action.$class}`,
        data: {
          type: 'action',
          data: item
        }
      }))
    }))
  });

  return {
    calculateComponent,
    calculateLifeCycle 
  };
};