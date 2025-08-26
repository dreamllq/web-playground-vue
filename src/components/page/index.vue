<template>
  <div style='height: 600px; border: 1px solid;'>
    <playground-render :playground='playground' />
  </div>
  <div>
    <el-button @click='toJSON'>
      toJSON
    </el-button>
    <el-button @click='onCopy'>
      copy
    </el-button>
  </div>
  <div>
    <pre>
      {{ json }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { AutoHeightWrapper } from '@/models/auto-height-wrapper';
import { AutoPagination } from '@/models/auto-pagination';
import { FormGrid } from '@/models/form-grid';
import { FormGridItem } from '@/models/form-grid-item';
import { Layout } from '@/models/layout';
import { Playground, PlaygroundRender, formatPropsEvent, formatPropsPropFunction, formatPropsPropSlotContext, formatPropsPropValue, formatPropsPropVariable, formatPropsPropVariableValue, formatActionParamContext, formatActionParamValue, formatActionParamVariable, formatActionResultVariable, formatActionResultVariableValue, DirectiveValue, PropValueValue } from 'l-play-core';
import { Div, Text } from 'l-play-dom-component';
import { Button, Dialog, Form, Input, Table, TableColumn, FormItem, Icon } from 'l-play-element-plus-component';
import { ActionOperator, ActionFetch, ActionRef, ActionStructTransform } from 'l-play-action';
import { FormLayoutWrapper } from '@/models/form-layout-wrapper';
import { VIfElse } from 'l-play-vue-component';
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
const json = ref('');

const toJSON = () => {
  json.value = JSON.stringify(playground.toJSON(), null, 2);
};
const {
  text, copy, copied, isSupported 
} = useClipboard({ source: json });

const onCopy = () => {
  copy(json.value);
};

const playground = new Playground();
const token = 'Bearer eyJraWQiOiJ1YWEtYXV0aG9yaXphdGlvbi1yc2Eta2V5IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJwYWlwYWkiLCJhdXRvX2xvZ2luIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvc2Nwby11YWEtc2VydmljZS50ZXN0LnN2Yy5jbHVzdGVyLmxvY2FsOjMwMDMxXC91YWEiLCJ1c2VySWQiOjY5NDI3OTE1MjM2NDMzOTIxLCJwbGF0Zm9ybSI6IkNPTVBMRVRFX0VESVRJT04iLCJhdXRob3JpdGllcyI6WyI2OTQyNzkxNTQ4NTkxNzE4NCJdLCJhdWQiOiJhcHNfc3lzdGVtIiwibmJmIjoxNzU2MjAyMDU4LCJzY29wZSI6WyJvcGVuaWQiXSwidGVuYW50SWQiOjY5NDI3OTE1MjM2NDMzOTIwLCJleHAiOjE3NTYyMDU2NTgsImlhdCI6MTc1NjIwMjA1OCwic3VwZXJ2aXNvciI6dHJ1ZX0.EBLw3BUHugx62tyetxO1mXjMM2xFCwsmpq4JsnuJ3ZHam79QpRHgW9CvuKNPkJ4ibrItJaLCN2KwkFROUBcbUibIyFNUOBuVfxYF8yXBdXN91OMshLfyD3OgoWby_2lJmYi0nSsH0DWjm1-sZxRb2WMk45aE5DJ3BDZnTXvPX9Gpe9lpE-b8-xgEn-TrvJmc3eFediBBioT6twmbDFcflHDcFqhO5T9KeAY5ONOiWWQcLgVurw7NcBOC7i5WoGY1qGw0qudG62DlQXRXehzBKyCqj_LtwW1GkWjTH-ONnTTv5S_auWdWY0avcgEhlzgWKoLq7IH92TU-_5CZHAkgOA';
// #region components
const layout = playground.component(Layout);
const autoPagination = playground.component(AutoPagination);
const formGrid = playground.component(FormGrid);
const formGridItem = playground.component(FormGridItem);
const input = playground.component(Input);
const createButton = playground.component(Button);
const createText = playground.component(Text);
const addIcon = playground.component(Icon);
const deleteIcon = playground.component(Icon);
const batchDeleteButton = playground.component(Button);
const batchDeleteText = playground.component(Text);
const autoHeightWrapper = playground.component(AutoHeightWrapper);
const table = playground.component(Table);
const column1 = playground.component(TableColumn);
const operateColumn = playground.component(TableColumn);
const editButton = playground.component(Button);
const editButton1 = playground.component(Input);
const editButtonText = playground.component(Text);
const editInitLoadingDiv = playground.component(Div);

// #region  add dialog
const addDialog = playground.component(Dialog);
const addForm = playground.component(Form);
const addFormLayoutWrapper = playground.component(FormLayoutWrapper);
const addFormItemName = playground.component(FormItem);
const addFormItemNameInput = playground.component(Input);
const footer = playground.component(Div);
const cancelConfirmButton = playground.component(Button);
const cancelConfirmButtonText = playground.component(Text);
const addConfirmButton = playground.component(Button);
const addConfirmButtonText = playground.component(Text);

// #endregion

// #region  edit dialog
const editDialog = playground.component(Dialog);
const editForm = playground.component(Form);
const editFormLayoutWrapper = playground.component(FormLayoutWrapper);
const editFormItemName = playground.component(FormItem);
const editFormItemNameInput = playground.component(Input);
const initVIfElse = playground.component(VIfElse);
const editFooter = playground.component(Div);
editFooter.props.class = formatPropsPropValue('dialog-footer');
const editCancelConfirmButton = playground.component(Button);
const editCancelConfirmButtonText = playground.component(Text);
editCancelConfirmButton.slots.default = [editCancelConfirmButtonText];
editCancelConfirmButtonText.props.text = formatPropsPropValue('取消');
const editAddConfirmButton = playground.component(Button);
editAddConfirmButton.props.type = formatPropsPropValue('primary');
const editAddConfirmButtonText = playground.component(Text);
editAddConfirmButton.slots.default = [editAddConfirmButtonText];
editAddConfirmButtonText.props.text = formatPropsPropValue('确认');
editFooter.slots.default = [editCancelConfirmButton, editAddConfirmButton];

// #endregion


// #endregion

// #region vars
const filter = playground.var('filter', { name: '111' });
const fetchRes = playground.var('fetchRes', []);
const tableReturnData = playground.var('tableReturnData', {});

const visible = playground.var('visible', false);
const addFormVar = playground.var('addForm', { name: '' });
const addConfirmButtonLoading = playground.var('addConfirmButtonLoading', false);

const editVisible = playground.var('visible', false);
const editFormVar = playground.var('addForm', { name: '' });
const editInitLoading = playground.var('editInitLoading', false);
const editConfirmButtonLoading = playground.var('editConfirmButtonLoading', false);

// #endregion

// #region actions
const aAction = playground.action(ActionOperator, 'aAction');
const tableFetch = playground.action(ActionRef, 'tableFetch');
const fetchDataAction = playground.action(ActionFetch, 'fetchDataAction');
const resTransform = playground.action(ActionStructTransform, 'resTransform');
const visibleUpdate = playground.action(ActionOperator, 'visibleUpdate');
const createButtonAction = playground.action(ActionOperator, 'createButtonAction');
const addFormItemNameInputUpdate = playground.action(ActionOperator, 'addFormItemNameInputUpdate');
const cancelConfirmButtonAction = playground.action(ActionOperator, 'addConfirmButtonAction');

const addConfirmButtonLoadingTrueAction = playground.action<ActionOperator>(ActionOperator, 'addConfirmButtonLoadingTrueAction');
addConfirmButtonLoadingTrueAction.params.push(formatActionParamValue(true));
addConfirmButtonLoadingTrueAction.result = formatActionResultVariable(addConfirmButtonLoading);

const addConfirmButtonLoadingFalseAction = playground.action<ActionOperator>(ActionOperator, 'addConfirmButtonLoadingFalseAction');
addConfirmButtonLoadingFalseAction.params.push(formatActionParamValue(false));
addConfirmButtonLoadingFalseAction.result = formatActionResultVariable(addConfirmButtonLoading);

const editVisibleUpdate = playground.action(ActionOperator, 'editVisibleUpdate');
const showEditDialog = playground.action(ActionOperator, 'showEditDialog');
showEditDialog.params.push(formatActionParamValue(true));
showEditDialog.result = formatActionResultVariable(editVisible);
const getEditData = playground.action(ActionOperator, 'addFormItemNameInputUpdate');
getEditData.params.push(formatActionParamValue('1112'));
getEditData.result = formatActionResultVariableValue(editFormVar, 'name');
const setEditInitLoadingTrue = playground.action(ActionOperator, 'setEditInitLoadingTrue');
setEditInitLoadingTrue.params.push(formatActionParamValue(true));
setEditInitLoadingTrue.result = formatActionResultVariable(editInitLoading);
const setEditInitLoadingFalse = playground.action(ActionOperator, 'setEditInitLoadingTrue');
setEditInitLoadingFalse.params.push(formatActionParamValue(false));
setEditInitLoadingFalse.result = formatActionResultVariable(editInitLoading);
const editFormItemNameInputUpdate = playground.action(ActionOperator, 'editFormItemNameInputUpdate');

const setEditVisibleFalse = playground.action(ActionOperator, 'setEditVisibleFalse');
setEditVisibleFalse.params.push(formatActionParamValue(false));
setEditVisibleFalse.result = formatActionResultVariable(editVisible);

const setEditConfirmButtonLoadingTrue = playground.action(ActionOperator, 'setEditConfirmButtonLoadingTrue');
setEditConfirmButtonLoadingTrue.params.push(formatActionParamValue(true));
setEditConfirmButtonLoadingTrue.result = formatActionResultVariable(editConfirmButtonLoading);
const setEditConfirmButtonLoadingFalse = playground.action(ActionOperator, 'setEditConfirmButtonLoadingFalse');
setEditConfirmButtonLoadingFalse.params.push(formatActionParamValue(false));
setEditConfirmButtonLoadingFalse.result = formatActionResultVariable(editConfirmButtonLoading);

// #endregion

// #region filter

formGrid.props.model = formatPropsPropVariable(filter);

formGridItem.props.label = formatPropsPropValue('名称');
formGridItem.props.prop = formatPropsPropValue('name');

input.props.modelValue = formatPropsPropVariableValue(filter, 'name');


aAction.params.push(formatActionParamContext(0));
aAction.result = formatActionResultVariableValue(filter, 'name');

input.props['onUpdate:modelValue'] = formatPropsEvent([aAction]);

formGridItem.slots.default = [input];

tableFetch.extension.ref = autoPagination.id;
tableFetch.extension.funcName = 'goFirstPage';

formGrid.props.onSearch = formatPropsEvent(tableFetch);

formGrid.slots.default = [formGridItem];

layout.slots.filter = [formGrid];
// #endregion

// #region buttons

addIcon.props.icon = formatPropsPropValue('Plus');
addIcon.props.class = formatPropsPropValue('el-icon--left');

deleteIcon.props.icon = formatPropsPropValue('Delete');
deleteIcon.props.class = formatPropsPropValue('el-icon--left');

createText.props.text = formatPropsPropValue('创建');
createButton.props.type = formatPropsPropValue('primary');

createButton.props.plain = formatPropsPropValue(true);

createButton.slots.default = [addIcon, createText];

batchDeleteText.props.text = formatPropsPropValue('批量删除');

batchDeleteButton.slots.default = [deleteIcon, batchDeleteText];

batchDeleteButton.props.type = formatPropsPropValue('danger');

batchDeleteButton.props.plain = formatPropsPropValue(true);

layout.slots.buttonGroup = [createButton, batchDeleteButton];
// #endregion

// #region table
fetchDataAction.result = formatActionResultVariable(fetchRes);
fetchDataAction.extension.url = 'https://api.sit.alsi.cn/iam/user-management/users?name=&roleIds=&mobile=&enabled=&pageNo=1&pageSize=20&orderItems%5B0%5D.column=create_time&orderItems%5B0%5D.asc=false';
fetchDataAction.extension.method = 'get';
fetchDataAction.extension.headers = {
  'Content-Type': 'application/json',
  'authorization': token,
  'siteid': '72794563987042304'
};
resTransform.extension.ruleString = 'data';
resTransform.params.push(formatActionParamVariable(fetchRes));
resTransform.result = formatActionResultVariable(tableReturnData);

autoPagination.props.fetchData = formatPropsPropFunction([fetchDataAction, resTransform], tableReturnData);
autoPagination.props.autoInit = formatPropsPropValue(true);

autoPagination.slots.default = [autoHeightWrapper];

table.props.height = formatPropsPropSlotContext(autoHeightWrapper, 'size.height');
table.props.border = formatPropsPropValue(true);
table.props.data = formatPropsPropSlotContext(autoPagination, 'data');

column1.props.label = formatPropsPropValue('名称');
column1.props.prop = formatPropsPropValue('name');

operateColumn.props.label = formatPropsPropValue('操作');
operateColumn.props.width = formatPropsPropValue(200);

editButton.props.link = formatPropsPropValue(true);
editButton.props.type = formatPropsPropValue('primary');
editButtonText.props.text = formatPropsPropValue('编辑');
// editButton.slots.default = [editButtonText];
const editButton2 = playground.component(Button);
const div11 = playground.component(Div);
div11.props.innerHTML = formatPropsPropValue('编辑');
editButton2.slots.default = [div11];
operateColumn.slots.default = [editButton2];


editButton.props.onClick = formatPropsEvent([
  setEditInitLoadingTrue,
  showEditDialog,
  fetchDataAction,
  getEditData,
  setEditInitLoadingFalse
]);

table.slots.default = [column1, operateColumn];

autoHeightWrapper.slots.default = [table];

layout.slots.dataTable = [autoPagination];
// #endregion

// #region add dialog 

addDialog.props.modelValue = formatPropsPropVariable(visible);

addDialog.props.title = formatPropsPropValue('新建');

visibleUpdate.params.push(formatActionParamContext(0));

visibleUpdate.result = formatActionResultVariable(visible);

addDialog.props['onUpdate:modelValue'] = formatPropsEvent(visibleUpdate);

createButtonAction.params.push(formatActionParamValue(true));

createButtonAction.result = formatActionResultVariable(visible);
createButton.props.onClick = formatPropsEvent(createButtonAction);

addForm.props.model = formatPropsPropVariable(addFormVar);
addForm.props.labelPosition = formatPropsPropValue('top');

addFormLayoutWrapper.props.col = formatPropsPropValue(2);

addForm.slots.default = [addFormLayoutWrapper];

addFormItemName.props.label = formatPropsPropValue('姓名');
addFormItemName.props.prop = formatPropsPropValue('name');
addFormItemNameInput.props.modelValue = formatPropsPropVariableValue(addFormVar, 'name');
addFormItemNameInputUpdate.params.push(formatActionParamContext(0));
addFormItemNameInputUpdate.result = formatActionResultVariableValue(addFormVar, 'name');
addFormItemNameInput.props['onUpdate:modelValue'] = formatPropsEvent(addFormItemNameInputUpdate);

addFormItemName.slots.default = [addFormItemNameInput];

addFormLayoutWrapper.slots.default = [addFormItemName];


// #region footer
addDialog.slots.footer = [footer];
footer.props.class = formatPropsPropValue('dialog-footer');


cancelConfirmButtonText.props.text = formatPropsPropValue('取消');
cancelConfirmButton.slots.default = [cancelConfirmButtonText];

cancelConfirmButtonAction.params.push(formatActionParamValue(false));

cancelConfirmButtonAction.result = formatActionResultVariable(visible);

cancelConfirmButton.props.onClick = formatPropsEvent(cancelConfirmButtonAction);

addConfirmButton.props.type = formatPropsPropValue('primary');

addConfirmButtonText.props.text = formatPropsPropValue('确定');

addConfirmButton.props.loading = formatPropsPropVariable(addConfirmButtonLoading);

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

// #region edit dialog
editVisibleUpdate.params.push(formatActionParamContext(0));
editVisibleUpdate.result = formatActionResultVariable(editVisible);

editDialog.props.title = formatPropsPropValue('编辑');
editDialog.props.modelValue = formatPropsPropVariable(editVisible);
editDialog.props['onUpdate:modelValue'] = formatPropsEvent(editVisibleUpdate);
editDialog.slots.default = [initVIfElse];

editInitLoadingDiv.props.style = formatPropsPropValue('height: 100px;');
editInitLoadingDiv.directives.loading = new DirectiveValue(new PropValueValue(true));

initVIfElse.props.condition = formatPropsPropVariable(editInitLoading);
initVIfElse.slots.default = [editInitLoadingDiv];
initVIfElse.slots.else = [editForm];

editForm.slots.default = [editFormLayoutWrapper];
editForm.props.labelPosition = formatPropsPropValue('top');

editFormLayoutWrapper.slots.default = [editFormItemName];

editFormItemName.slots.default = [editFormItemNameInput];
editFormItemName.props.label = formatPropsPropValue('姓名');
editFormItemName.props.prop = formatPropsPropValue('name');
editFormItemNameInput.props.modelValue = formatPropsPropVariableValue(editFormVar, 'name');
editFormItemNameInputUpdate.params.push(formatActionParamContext(0));
editFormItemNameInputUpdate.result = formatActionResultVariableValue(editFormVar, 'name');
editFormItemNameInput.props['onUpdate:modelValue'] = formatPropsEvent(editFormItemNameInputUpdate);

editFormItemNameInput.props.modelValue = formatPropsPropVariableValue(editFormVar, 'name');

editDialog.slots.footer = [editFooter];

editCancelConfirmButton.props.onClick = formatPropsEvent(setEditVisibleFalse);

editAddConfirmButton.props.loading = formatPropsPropVariable(editConfirmButtonLoading);
editAddConfirmButton.props.onClick = formatPropsEvent([
  setEditConfirmButtonLoadingTrue,
  fetchDataAction,
  setEditConfirmButtonLoadingFalse,
  setEditVisibleFalse,
  tableFetch
]);
// #endregion
playground.tree.push(layout);
playground.tree.push(addDialog);
playground.tree.push(editDialog);
console.log(playground);

</script>

<style scoped lang="scss">
pre {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            overflow-x: auto;
            font-family: 'Courier New', Courier, monospace;
            font-size: 12px;
        }
</style>