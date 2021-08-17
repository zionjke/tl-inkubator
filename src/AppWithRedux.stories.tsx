import {Story} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/App',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

const Template: Story = () => <AppWithRedux/>

export const AppWithReduxNewStories = Template.bind({});
AppWithReduxNewStories.args = {}
