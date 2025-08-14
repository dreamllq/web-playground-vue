import { ComponentId, ComponentType, IComponent, PropItem } from '../types/component';
export declare class Component<TRef = any, TProps = Record<string, PropItem>, TSlots = Record<string, Component<any, any, any>[]>> implements IComponent<TProps> {
    getComponent(): Promise<any>;
    getProps(): TProps;
    id: ComponentId;
    type: ComponentType;
    props: TProps;
    name: string;
    ref?: TRef;
    slots: TSlots;
}
