import { PropsPropValueForm } from './props/type';

export type ComponentForm = {
  name: string;
  component: string;
};

export type DirectiveItem = {
  name: string,
  value:PropsPropValueForm,
  arg?: string,
  modifiers?: Record<string, boolean>
}