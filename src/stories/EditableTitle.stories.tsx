import {action} from "@storybook/addon-actions";
import {Meta, Story} from "@storybook/react";
import React from "react";
import {EditableTitle, EditableTitlePropsType} from "../components/EditableTitle";


export default {
    title: 'Todolist/Index',
    component: EditableTitle,
    argTypes: {
        changeTitle: {
            description: 'Value Index changed'
        },
        title: {
            defaultValue: 'TEST',
            description: 'Start value Index'
        }
    }
} as Meta

const Template: Story<EditableTitlePropsType> = (args: EditableTitlePropsType) => <EditableTitle {...args}/>

export const EditableTitleExample = Template.bind({})
EditableTitleExample.args = {
    title: 'TEST',
    changeTitle: action('Value Index changed')
}
