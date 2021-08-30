import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

// export type GlobalStateType = {
//     todoLists: TodoListType[]
//     tasks: TaskStateType
// }

export type GlobalStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
