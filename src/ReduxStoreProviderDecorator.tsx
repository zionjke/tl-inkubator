import React from "react";
import {Provider} from "react-redux";
import {GlobalStateType} from "./state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./state/tasks-reducer";
import {todolistsReducer} from "./state/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: false},
        ]
    }
}

const storyBookStore = createStore(rootReducer)

export const ReduxStoreProviderDecorator = (story: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>
        {story()}
    </Provider>
}
