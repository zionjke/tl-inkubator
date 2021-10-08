import {Story} from "@storybook/react";
import App from "../app/App";
import {ReduxStoreProviderDecorator} from "../ReduxStoreProviderDecorator";


export default {
    title: 'Todolist/AppWithUseState',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

const Template: Story = () => <App/>

export const AppWithReduxNewStories = Template.bind({});
AppWithReduxNewStories.args = {}
