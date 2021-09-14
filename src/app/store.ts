import { combineReducers} from "redux";
import {TodolistsActionTypes} from "../features/todolists/todolists-reducer_old";
import {TasksActionsType} from "../features/todolists/tasks-reducer_old";
import thunk, {ThunkAction} from "redux-thunk";
import {AppReducerActionsTypes} from "./app-reducer_old";
import {AuthActionTypes} from "../features/login/auth-reducer_old";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/login/auth-reducer";
import appReducer  from "./app-reducer";
import todolistsReducer from "../features/todolists/todolists-reducer";
import { tasksReducer } from "../features/todolists/tasks-reducer";



const rootReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer
})

//типизация стейта всего App
export type GlobalStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего App
export type AppActionsType = TodolistsActionTypes | TasksActionsType | AppReducerActionsTypes | AuthActionTypes

//типизация thunk для всего App
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GlobalStateType, unknown, AppActionsType>

// export const store = createStore(rootReducer, applyMiddleware(thunk))

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

