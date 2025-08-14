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
import { Playground, PlaygroundRender, PropType, PropValueType, Variable } from 'l-play-core';
import { Text } from 'l-play-dom-component';
import { Button, Input, Table, TableColumn } from 'l-play-element-plus-component';

const playground = new Playground();
const layout = new Layout();

// #region filter
const filter = new Variable('filter', {});
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

formGridItem.slots.default = [input];

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
const autoPagination = new AutoPagination();

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

playground.components.push(layout);
console.log(playground);

</script>

<style scoped>

</style>