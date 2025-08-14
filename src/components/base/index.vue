<template>
  <playground-render :playground='playground' />
</template>

<script setup lang="ts">
import { Playground } from 'l-play-core';
import { PlaygroundRender } from 'l-play-core';
import { Input } from 'l-play-element-plus-component';
import { Variable } from 'l-play-core';
import { PropType, PropValueType } from 'l-play-core';
import { ActionOperator } from 'l-play-action';
import { ParamType } from 'l-play-core';
import { Button } from 'l-play-element-plus-component';
import { Text } from 'l-play-dom-component';
import { Span } from 'l-play-dom-component';
import { Div } from 'l-play-dom-component';

const playground = new Playground();
const container = new Div();
container.slots.default = [];

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

container.slots.default.push(input);

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

container.slots.default.push(button);

// const text = new Text();
// text.props.text = {
//   type: PropType.PROP,
//   value: {
//     type: PropValueType.VALUE,
//     value: 'test'
//   }
// };
// container.slots.default.push(text);

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
container.slots.default.push(span);


const div = new Div();

div.props.innerHTML = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'div'
  }
};

container.slots.default.push(div);

playground.components.push(container);
console.log(playground);

</script>

<style scoped>

</style>