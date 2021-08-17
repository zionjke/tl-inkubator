import {TaskPropsType, TaskWithRedux} from "./TaskWithRedux";

import {Meta, Story} from "@storybook/react";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../state/store";
import {ReduxStoreProviderDecorator} from "../../ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/Task',
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story<TaskPropsType> = (args: TaskPropsType) => <TaskWithRedux {...args}/>;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: '1', title: 'JS', isDone: true},
    todoListID: 'todoListID1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: '1', title: 'JS', isDone: false},
    todoListID: 'todoListID1'
}

