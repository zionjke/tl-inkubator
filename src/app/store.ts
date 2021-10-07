import {combineReducers} from "redux";
import {TodolistsActionTypes} from "../old_trash/todolists-reducer_old";
import {TasksActionsType} from "../old_trash/tasks-reducer_old";
import  {ThunkAction} from "redux-thunk";
import {AppReducerActionsTypes} from "../old_trash/app-reducer_old";
import {AuthActionTypes} from "../old_trash/auth-reducer_old";
import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "../features/auth/auth-reducer";
import appReducer from "./app-reducer";
import todolistsReducer from "../features/todolists/todolists-reducer";
import {useDispatch} from "react-redux";
import tasksReducer from "../features/tasks/tasks-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer
})


//Без тулкита :)
//типизация стейта всего App
export type GlobalStateType = ReturnType<typeof rootReducer>

//все типы экшенов для всего App
export type AppActionsType = TodolistsActionTypes | TasksActionsType | AppReducerActionsTypes | AuthActionTypes

//типизация thunk для всего App
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GlobalStateType, unknown, AppActionsType>

// export const store = createStore(rootReducer, applyMiddleware(thunk))


// С тулкитом
export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

