import {AppThunk} from "../store";
import {authApi} from "../api/auth-api";
import {setIsAuthAC} from "./auth-reducer_old";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";

const initialState: AppInitialStateType = {
    status: "idle", // происходит ли сейчас взаимодействие с сервером
    error: null, // текст ошибки если произойдет ошибка при запросе
    isInitialized: false // состояние инициализации приложения
}

export const appReducer_old = (state: AppInitialStateType = initialState, action: AppReducerActionsTypes): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//actions
export const setAppStatusActionCreator = (status: AppStatusesType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorActionCreator = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedActionCreator = (isInitialized: boolean) => ({
    type: 'APP/SET-IS-INITIALIZED',
    isInitialized
} as const)


//thunk
export const initializeApp = (): AppThunk => async dispatch => {
    try {
        let {data} = await authApi.authMe()
        if (data.resultCode === 0) {
            dispatch(setIsAuthAC(true))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
    dispatch(setAppInitializedActionCreator(true))
}

//types
export type AppStatusesType = "idle" | "loading" | "failed" | "succeeded"
export type AppInitialStateType = {
    status: AppStatusesType
    error: string | null
    isInitialized: boolean
}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusActionCreator>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorActionCreator>
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedActionCreator>


export type AppReducerActionsTypes = SetAppErrorActionType | SetAppStatusActionType | SetAppInitializedActionType
