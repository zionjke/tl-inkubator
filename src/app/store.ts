import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionTypes, todolistsReducer} from "../features/todolists/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/todolists/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer, AppReducerActionsTypes} from "./app-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

//типизация стейта всего App
export type GlobalStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего App
export type AppActionsType = TodolistsActionTypes | TasksActionsType | AppReducerActionsTypes

//типизация thunk для всего App
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GlobalStateType, unknown, AppActionsType>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
