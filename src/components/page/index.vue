<template>
  <div style='height: 600px; border: 1px solid;'>
    <playground-render :playground='playground' />
  </div>
</template>

<script setup lang="ts">
import { AutoHeightWrapper } from '@/models/auto-height-wrapper';
import { AutoPagination } from '@/models/auto-pagination';
import { FormGrid } from '@/models/form-grid';
import { FormGridItem } from '@/models/form-grid-item';
import { Layout } from '@/models/layout';
import { Playground, PlaygroundRender, PropType, PropValueType, Variable, ParamType, ActionReturnType } from 'l-play-core';
import { Text } from 'l-play-dom-component';
import { Button, Input, Table, TableColumn } from 'l-play-element-plus-component';
import { ActionOperator, ActionFetch, ActionRef, ActionStructTransform } from 'l-play-action';

const playground = new Playground();
const layout = new Layout();
const autoPagination = new AutoPagination();

// #region filter
const filter = new Variable('filter', { name: '111' });
playground.variables.push(filter);

const formGrid = new FormGrid();
formGrid.props.model = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VARIABLE,
    value: filter
  }
};

const formGridItem = new FormGridItem();
formGridItem.props.label = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: '名称'
  }
};

formGridItem.props.prop = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'name'
  }
};

const input = new Input();

input.props.modelValue = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VARIABLE_VALUE,
    value: filter,
    key: 'name'
  }
};

const aAction = new ActionOperator('aAction');

aAction.params.push({
  type: ParamType.CONTEXT,
  value: 0
});

aAction.returnVariable = {
  type: ActionReturnType.VARIABLE_VALUE,
  value: filter,
  key: 'name'
};

input.props['onUpdate:modelValue'] = {
  type: PropType.EVENT,
  value: [aAction]
};

playground.actions.push(aAction);

formGridItem.slots.default = [input];

const tableFetch = new ActionRef('tableFetch');
tableFetch.ref = autoPagination;
tableFetch.funcName = 'goFirstPage';

playground.actions.push(tableFetch);

formGrid.props.onSearch = {
  type: PropType.EVENT,
  value: tableFetch
};

formGrid.slots.default = [formGridItem];

layout.slots.filter = [formGrid];
// #endregion

// #region buttons
const createButton = new Button();
const createText = new Text();
createText.props.text = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: '创建'
  }
};
createButton.props.type = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'primary'
  }
};

createButton.props.plain = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: true
  }
};


createButton.slots.default = [createText];

const batchDeleteButton = new Button();
const batchDeleteText = new Text();
batchDeleteText.props.text = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: '批量删除'
  }
};
batchDeleteButton.slots.default = [batchDeleteText];
batchDeleteButton.props.type = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'danger'
  }
};

batchDeleteButton.props.plain = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: true
  }
};

layout.slots.buttonGroup = [createButton, batchDeleteButton];
// #endregion

// #region table

const fetchDataAction = new ActionFetch('fetchDataAction');
const fetchRes = new Variable('fetchRes', []);
playground.variables.push(fetchRes);
fetchDataAction.returnVariable = {
  type: ActionReturnType.VARIABLE,
  value: fetchRes
};
fetchDataAction.url = 'https://api.sit.alsi.cn/iam/user-management/users?name=&roleIds=&mobile=&enabled=&pageNo=1&pageSize=20&orderItems%5B0%5D.column=create_time&orderItems%5B0%5D.asc=false';
fetchDataAction.method = 'get';
fetchDataAction.headers = {
  'Content-Type': 'application/json',
  'authorization': 'Bearer eyJraWQiOiJ1YWEtYXV0aG9yaXphdGlvbi1yc2Eta2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJwYWlwYWkiLCJhdXRvX2xvZ2luIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvc2Nwby11YWEtc2VydmljZS50ZXN0LnN2Yy5jbHVzdGVyLmxvY2FsOjMwMDMxXC91YWEiLCJ1c2VySWQiOjY5NDI3OTE1MjM2NDMzOTIxLCJwbGF0Zm9ybSI6IkNPTVBMRVRFX0VESVRJT04iLCJhdXRob3JpdGllcyI6WyI2OTQyNzkxNTQ4NTkxNzE4NCJdLCJhdWQiOiJhcHNfc3lzdGVtIiwibmJmIjoxNzU1MjI2OTgwLCJzY29wZSI6WyJvcGVuaWQiXSwidGVuYW50SWQiOjY5NDI3OTE1MjM2NDMzOTIwLCJleHAiOjE3NTUyMzA1ODAsImlhdCI6MTc1NTIyNjk4MCwic3VwZXJ2aXNvciI6dHJ1ZX0.J-8C2syA4femKsuw7ZmkAftGLcLhkvugJFTVMO4aurl4lUxUGf_H4eqF6X2s9P4LJfjoNHkXRkeQsXKLWHGWKkt-mdT-TQyLiOOuhX3YeO0wGqwZms4IkFofnKfIiIFLewNSrtBtArM5tY5-nrMDvpcNu_jsnkEYNDjwpb8kwXfUtvTqfJs_J-aPhyWqGnAB1ckw8dx4D7wKjN-CewYa-5TmP0RqaLhi6hZGIM7khBaySyqkBbnGhD_qFZZQJoh10CtmOwsquDWvlNoQ1zVssvA9WgPeuqOzLY1Yrs9N-ezPii3OZoJVP44OKbbU96xF2EVRZdwzPFmT91-uef4sTA',
  'siteid': '72794563987042304'
};
playground.actions.push(fetchDataAction);

const resTransform = new ActionStructTransform('resTransform');
playground.actions.push(resTransform);
resTransform.ruleString = 'data';
resTransform.params.push({
  type: ParamType.VARIABLE,
  value: fetchRes
});

autoPagination.props.fetchData = {
  type: PropType.PROP,
  value: {
    type: PropValueType.FUNCTION,
    value: [fetchDataAction],
    return: resTransform
  }
};

autoPagination.props.autoInit = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: true
  }
};

const autoHeightWrapper = new AutoHeightWrapper();
autoPagination.slots.default = [autoHeightWrapper];

const table = new Table();


table.props.height = {
  type: PropType.PROP,
  value: {
    type: PropValueType.SLOT_CONTEXT,
    value: {
      componentId: autoHeightWrapper.id,
      key: 'size.height'
    }
  }
};

table.props.border = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: true
  }
};

table.props.data = {
  type: PropType.PROP,
  value: {
    type: PropValueType.SLOT_CONTEXT,
    value: {
      componentId: autoPagination.id,
      key: 'data'
    }
  }
};
const column1 = new TableColumn();
column1.props.label = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: '名称'
  }
};
column1.props.prop = {
  type: PropType.PROP,
  value: {
    type: PropValueType.VALUE,
    value: 'name'
  }
};

table.slots.default = [column1];

autoHeightWrapper.slots.default = [table];

layout.slots.dataTable = [autoPagination];
// #endregion

// #region add dialog 


// #endregion

playground.components.push(layout);
console.log(playground);

</script>

<style scoped>

</style>