import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType, TodoListType} from "../types/types";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

// export type GlobalStateType = {
//     todoLists: TodoListType[]
//     tasks: TaskStateType
// }

export type GlobalStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store
