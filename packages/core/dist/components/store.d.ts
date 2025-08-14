import { Playground } from '../models/playground';
declare const useProvideStore: (playground: Playground) => {
    playground: Playground;
    refs: {};
    variables: {};
    actions: Record<string, (...args: any[]) => Promise<any> | any>;
}, useStore: () => {
    playground: Playground;
    refs: {};
    variables: {};
    actions: Record<string, (...args: any[]) => Promise<any> | any>;
} | undefined;
export { useProvideStore };
export { useStore };
