import { ActionRegister } from './action';
import { ComponentRegister } from './component';
import { Playground } from '../playground';
import { PlaygroundJSON } from '../../types/playground';

export class Register {
  actionRegister = new ActionRegister();
  componentRegister = new ComponentRegister();

  fromJSON(json: PlaygroundJSON | undefined) {
    const playground = new Playground();
    
    if (!json) return playground;

    json.variables?.forEach(item => {
      const variable = playground.var(item.name, item.value);
      variable.id = item.id;
    });

    json.actions?.forEach(item => {
      const actionClass = this.actionRegister.map.get(item.$class);
      if (!actionClass) throw new Error(`Action ${item.$class} not found`);
      const action = playground.action(actionClass, item.name);
      action.id = item.id;
    });

    json.components?.forEach(item => {
      const componentClass = this.componentRegister.map.get(item.$class);
      if (!componentClass) {
        console.log(item);
        throw new Error(`Component ${item.$class} not found`);
      }
      
      const component = playground.component(componentClass);
      component.id = item.id;
    });

    json.tree?.forEach(item => {
      const component = playground.getComponentById(item.id);
      playground.tree.push(component);
    });

    
    json.components?.forEach(json => {
      const component = playground.getComponentById(json.id);
      component.fromJson(json, {
        variables: playground.variables,
        components: playground.components,
        actions: playground.actions 
      });
    });

    json.actions?.forEach(json => {
      const action = playground.getActionById(json.id);
      action.fromJSON(json, {
        variables: playground.variables,
        components: playground.components,
        actions: playground.actions 
      });
    });

    const lifeCycle = {};
    if (json.lifeCycle) {
      Object.entries(json.lifeCycle).forEach(([key, actions]) => {
        lifeCycle[key] = actions.map(json => playground.getActionById(json.id));
      });
    }

    playground.lifeCycle = lifeCycle;

    return playground;
  }
}