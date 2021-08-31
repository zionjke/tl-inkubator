import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionTypes, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";


const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

//типизация стейта всего App
export type GlobalStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего App
export type AppActionsType = TodolistsActionTypes | TasksActionsType

//типизация thunk для всего App
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GlobalStateType, unknown, AppActionsType>

export const store = createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store
