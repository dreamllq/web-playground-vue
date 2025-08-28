import { LifeCycle } from 'l-play-core';

export const LIFE_CYCLE_LIST = [
  {
    value: LifeCycle.BEFORE_MOUNT,
    label: 'BEFORE_MOUNT'
  },
  {
    value: LifeCycle.MOUNTED,
    label: 'MOUNTED'
  },
  {
    value: LifeCycle.BEFORE_UPDATE,
    label: 'BEFORE_UPDATE'
  },
  {
    value: LifeCycle.UPDATED,
    label: 'UPDATED'
  },
  {
    value: LifeCycle.BEFORE_UNMOUNT,
    label: 'BEFORE_UNMOUNT'
  },
  {
    value: LifeCycle.UNMOUNTED,
    label: 'UNMOUNTED'
  }
];