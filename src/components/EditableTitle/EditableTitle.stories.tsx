import {action} from "@storybook/addon-actions";
import {Meta, Story} from "@storybook/react";
import React from "react";
import {EditableTitle, EditableTitlePropsType} from "./EditableTitle";


export default {
    title: 'Todolist/EditableTitle',
    component: EditableTitle,
    argTypes: {
        changeTitle: {
            description: 'Value EditableTitle changed'
        },
        title: {
            defaultValue: 'TEST',
            description: 'Start value EditableTitle'
        }
    }
} as Meta

const Template: Story<EditableTitlePropsType> = (args: EditableTitlePropsType) => <EditableTitle {...args}/>

export const EditableTitleExample = Template.bind({})
EditableTitleExample.args = {
    title: 'TEST',
    changeTitle: action('Value EditableTitle changed')
}
