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
import { Playground, PlaygroundRender, PropType, PropValueType, Variable, ParamType, ActionResultType, Action, formatPropsEvent, formatPropsPropFunction, formatPropsPropSlotContext, formatPropsPropValue, formatPropsPropVariable, formatPropsPropVariableValue, formatActionParamContext, formatActionParamValue, formatActionParamVariable, formatActionResultVariable, formatActionResultVariableValue } from 'l-play-core';
import { Div, Text } from 'l-play-dom-component';
import { Button, Dialog, Form, Input, Table, TableColumn, FormItem, Icon } from 'l-play-element-plus-component';
import { ActionOperator, ActionFetch, ActionRef, ActionStructTransform } from 'l-play-action';
import { FormLayoutWrapper } from '@/models/form-layout-wrapper';

const playground = new Playground();
const layout = new Layout();
const autoPagination = new AutoPagination();

// #region filter
const filter = playground.var('filter', { name: '111' });

const formGrid = new FormGrid();
formGrid.props.model = formatPropsPropVariable(filter);

const formGridItem = new FormGridItem();
formGridItem.props.label = formatPropsPropValue('名称');
formGridItem.props.prop = formatPropsPropValue('name');


const input = new Input();

input.props.modelValue = formatPropsPropVariableValue(filter, 'name');

const aAction = playground.action(ActionOperator, 'aAction');

aAction.params.push(formatActionParamContext(0));
aAction.result = formatActionResultVariableValue(filter, 'name');

input.props['onUpdate:modelValue'] = formatPropsEvent([aAction]);

formGridItem.slots.default = [input];

const tableFetch = playground.action(ActionRef, 'tableFetch');

tableFetch.ref = autoPagination;
tableFetch.funcName = 'goFirstPage';

formGrid.props.onSearch = formatPropsEvent(tableFetch);

formGrid.slots.default = [formGridItem];

layout.slots.filter = [formGrid];
// #endregion

// #region buttons
const createButton = new Button();
const createText = new Text();

const addIcon = new Icon();
addIcon.icon = 'Plus';
addIcon.props.class = formatPropsPropValue('el-icon--left');

const deleteIcon = new Icon();
deleteIcon.icon = 'Delete';
deleteIcon.props.class = formatPropsPropValue('el-icon--left');

createText.props.text = formatPropsPropValue('创建');
createButton.props.type = formatPropsPropValue('primary');

createButton.props.plain = formatPropsPropValue(true);

createButton.slots.default = [addIcon, createText];

const batchDeleteButton = new Button();
const batchDeleteText = new Text();
batchDeleteText.props.text = formatPropsPropValue('批量删除');

batchDeleteButton.slots.default = [deleteIcon, batchDeleteText];

batchDeleteButton.props.type = formatPropsPropValue('danger');

batchDeleteButton.props.plain = formatPropsPropValue(true);

layout.slots.buttonGroup = [createButton, batchDeleteButton];
// #endregion



// #region table
const fetchDataAction = playground.action(ActionFetch, 'fetchDataAction');
const fetchRes = playground.var('fetchRes', []);
fetchDataAction.result = formatActionResultVariable(fetchRes);
fetchDataAction.url = 'https://api.sit.alsi.cn/iam/user-management/users?name=&roleIds=&mobile=&enabled=&pageNo=1&pageSize=20&orderItems%5B0%5D.column=create_time&orderItems%5B0%5D.asc=false';
fetchDataAction.method = 'get';
fetchDataAction.headers = {
  'Content-Type': 'application/json',
  'authorization': 'Bearer eyJraWQiOiJ1YWEtYXV0aG9yaXphdGlvbi1yc2Eta2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJwYWlwYWkiLCJhdXRvX2xvZ2luIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvc2Nwby11YWEtc2VydmljZS50ZXN0LnN2Yy5jbHVzdGVyLmxvY2FsOjMwMDMxXC91YWEiLCJ1c2VySWQiOjY5NDI3OTE1MjM2NDMzOTIxLCJwbGF0Zm9ybSI6IkNPTVBMRVRFX0VESVRJT04iLCJhdXRob3JpdGllcyI6WyI2OTQyNzkxNTQ4NTkxNzE4NCJdLCJhdWQiOiJhcHNfc3lzdGVtIiwibmJmIjoxNzU1NDgwOTg5LCJzY29wZSI6WyJvcGVuaWQiXSwidGVuYW50SWQiOjY5NDI3OTE1MjM2NDMzOTIwLCJleHAiOjE3NTU0ODQ1ODksImlhdCI6MTc1NTQ4MDk4OSwic3VwZXJ2aXNvciI6dHJ1ZX0.O4Y5xrygFVry9O5qlk0OBIqLeipmR--sSYSSzq2e0a5bH2wpGEcJtXBUTDIZR96pbHq-cfl3BLd9TRB4lTuXcOO11PBxnGwnEFjr3WCWJi6Kb6ESDOJudH4YEvQ3o9g-sNRDu34pjLlD2l2mLBIi94qaiAYWg3Fg-t9_3hNkWskq44M72H43eJUAY2aDlwAl-IDV3ovyLh3CKF3FiPCHCkQcm2UJohpDbjcdTIDIbx5oufxD6CjrHt2lcfbzUbo2c53jJAX2qo1MY2iTl-IggXAPE3qkhzUC3tCD3z40miO-rEqGalfBknFO-7REaiW2Rv_HnVZStIKf-FtbRHzdWA',
  'siteid': '72794563987042304'
};
const resTransform = playground.action(ActionStructTransform, 'resTransform');
resTransform.ruleString = 'data';
resTransform.params.push(formatActionParamVariable(fetchRes));

autoPagination.props.fetchData = formatPropsPropFunction([fetchDataAction], resTransform);
autoPagination.props.autoInit = formatPropsPropValue(true);

const autoHeightWrapper = new AutoHeightWrapper();
autoPagination.slots.default = [autoHeightWrapper];

const table = new Table();


table.props.height = formatPropsPropSlotContext(autoHeightWrapper.id, 'size.height');
table.props.border = formatPropsPropValue(true);
table.props.data = formatPropsPropSlotContext(autoPagination.id, 'data');

const column1 = new TableColumn();
column1.props.label = formatPropsPropValue('名称');
column1.props.prop = formatPropsPropValue('name');

const operateColumn = new TableColumn();
operateColumn.props.label = formatPropsPropValue('操作');
operateColumn.props.width = formatPropsPropValue(200);

const editButton = new Button();
editButton.props.link = formatPropsPropValue(true);
editButton.props.type = formatPropsPropValue('primary');
const editButtonText = new Text();
editButtonText.props.text = formatPropsPropValue('编辑');
editButton.slots.default = [editButtonText];
operateColumn.slots.default = [editButton];


table.slots.default = [column1, operateColumn];

autoHeightWrapper.slots.default = [table];

layout.slots.dataTable = [autoPagination];
// #endregion

// #region add dialog 
const addDialog = new Dialog();
playground.tree.push(addDialog);
const visible = new Variable('visible', false);
playground.variables.push(visible);

addDialog.props.modelValue = formatPropsPropVariable(visible);

addDialog.props.title = formatPropsPropValue('新建');

const visibleUpdate = playground.action(ActionOperator, 'visibleUpdate');

visibleUpdate.params.push(formatActionParamContext(0));

visibleUpdate.result = formatActionResultVariable(visible);

addDialog.props['onUpdate:modelValue'] = formatPropsEvent(visibleUpdate);


const createButtonAction = playground.action(ActionOperator, 'createButtonAction');
createButtonAction.params.push(formatActionParamValue(true));

createButtonAction.result = formatActionResultVariable(visible);
createButton.props.onClick = formatPropsEvent(createButtonAction);


const addForm = new Form();
const addFormVar = new Variable('addForm', { name: '' });
playground.variables.push(addFormVar);

addForm.props.model = formatPropsPropVariable(addFormVar);
addForm.props.labelPosition = formatPropsPropValue('top');

const addFormLayoutWrapper = new FormLayoutWrapper();
addFormLayoutWrapper.props.col = formatPropsPropValue(2);

addForm.slots.default = [addFormLayoutWrapper];

const addFormItemName = new FormItem();
addFormItemName.props.label = formatPropsPropValue('姓名');
addFormItemName.props.prop = formatPropsPropValue('name');

const addFormItemNameInput = new Input();
addFormItemNameInput.props.modelValue = formatPropsPropVariableValue(addFormVar, 'name');

const addFormItemNameInputUpdate = playground.action(ActionOperator, 'addFormItemNameInputUpdate');
addFormItemNameInputUpdate.params.push(formatActionParamContext(0));

addFormItemNameInputUpdate.result = formatActionResultVariableValue(addFormVar, 'name');

addFormItemNameInput.props['onUpdate:modelValue'] = formatPropsEvent(addFormItemNameInputUpdate);

addFormItemName.slots.default = [addFormItemNameInput];

addFormLayoutWrapper.slots.default = [addFormItemName];


// #region footer
const footer = new Div();
addDialog.slots.footer = [footer];
footer.props.class = formatPropsPropValue('dialog-footer');

const cancelConfirmButton = new Button();
const cancelConfirmButtonText = new Text();
cancelConfirmButtonText.props.text = formatPropsPropValue('取消');
cancelConfirmButton.slots.default = [cancelConfirmButtonText];

const cancelConfirmButtonAction = playground.action(ActionOperator, 'addConfirmButtonAction');
cancelConfirmButtonAction.params.push(formatActionParamValue(false));

cancelConfirmButtonAction.result = formatActionResultVariable(visible);

cancelConfirmButton.props.onClick = formatPropsEvent(cancelConfirmButtonAction);

const addConfirmButton = new Button();
addConfirmButton.props.type = formatPropsPropValue('primary');

const addConfirmButtonText = new Text();
addConfirmButtonText.props.text = formatPropsPropValue('确定');

const addConfirmButtonLoading = playground.var('addConfirmButtonLoading', false);
addConfirmButton.props.loading = formatPropsPropVariable(addConfirmButtonLoading);

const addConfirmButtonLoadingTrueAction = playground.action<ActionOperator>(ActionOperator, 'addConfirmButtonLoadingTrueAction');
addConfirmButtonLoadingTrueAction.params.push(formatActionParamValue(true));

addConfirmButtonLoadingTrueAction.result = formatActionResultVariable(addConfirmButtonLoading);
const addConfirmButtonLoadingFalseAction = playground.action<ActionOperator>(ActionOperator, 'addConfirmButtonLoadingFalseAction');
addConfirmButtonLoadingFalseAction.params.push(formatActionParamValue(false));

addConfirmButtonLoadingFalseAction.result = formatActionResultVariable(addConfirmButtonLoading);
addConfirmButton.props.onClick = formatPropsEvent([
  addConfirmButtonLoadingTrueAction,
  fetchDataAction,
  addConfirmButtonLoadingFalseAction,
  cancelConfirmButtonAction,
  tableFetch
]);

addConfirmButton.slots.default = [addConfirmButtonText];

footer.slots.default = [cancelConfirmButton, addConfirmButton];
// #endregion

addDialog.slots.default = [addForm];

// #endregion

playground.tree.push(layout);
console.log(playground);

</script>

<style scoped>

</style>