<template>
  <v-playground :playground='playground' />
</template>

<script setup lang="ts">
import { Playground } from '@/models/foundation/playground';
import { Playground as VPlayground } from '@/index';
import { Container } from '@/models/foundation/container';
import { Input } from '@/models/ui/input';
import { Variable } from '@/models/foundation/variable';
import { PropType, PropValueType } from '@/types/component';
import { ActionOperator } from '@/models/foundation/action-operator';
import { ParamType } from '@/types/action';
import { Button } from '@/models/ui/button';
import { Text } from '@/models/dom/text';
import { Span } from '@/models/dom/span';
import { Div } from '@/models/dom/div';

const playground = new Playground();
const container = new Container();

const aVar = new Variable('aVar', 'asdlll');
playground.variables.push(aVar);

const aAction = new ActionOperator('aAction');
aAction.params.push({
  type: ParamType.REF,
  value: 0
});
aAction.returnVariable = aVar;

playground.actions.push(aAction);


const input = new Input();
input.props.modelValue = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VARIABLE,
    value: aVar
  } 
};

input.props['onUpdate:modelValue'] = {
  type: PropType.EVENT,
  value: [aAction]
};

container.comList.push(input);

const button = new Button();
button.props.type = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'primary'
  }
};


const text1 = new Text();
text1.props.text = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'test1'
  }
};
button.slots.default = [text1];

container.comList.push(button);

const text = new Text();
text.props.text = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'test'
  }
};
container.comList.push(text);

const span = new Span();
span.props.innerHTML = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'span'
  }
};

span.props.style = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: {
      color: 'red',
      backgroundColor: 'blue' 
    }
  }
};
container.comList.push(span);


const div = new Div();

div.props.innerHTML = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'div'
  }
};

container.comList.push(div);

playground.containers.push(container);
console.log(playground);

</script>

<style scoped>

</style>