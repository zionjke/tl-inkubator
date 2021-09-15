import {AppThunk} from "../app/store"
import {authApi, LoginParamsType, UserDataType} from "../api/auth-api";
import {setAppStatusActionCreator} from "./app-reducer_old";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";

const initialState: AuthInitialStateType = {
    isAuth: false
}

export const authReducer_old = (state = initialState, action: AuthActionTypes): AuthInitialStateType => {
    switch (action.type) {
        case "AUTH/SET_IS_AUTH":
            return {...state, isAuth: action.isAuth}
        default:
            return state
    }
}


//actions
export const setUserIdAC = (userId: number) => ({type: 'AUTH/SET_USER', userId} as const)
export const setUserDataAC = (user: UserDataType) => ({type: 'AUTH/SET_USER_DATA', user} as const)
export const setIsAuthAC = (isAuth: boolean) => ({type: 'AUTH/SET_IS_AUTH', isAuth} as const)

//thunks

export const login = (loginData: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusActionCreator("loading"))
    try {
        let {data} = await authApi.login(loginData)
        if (data.resultCode === 0) {
            dispatch(setIsAuthAC(true))
            dispatch(setAppStatusActionCreator("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}

export const logOut = (): AppThunk => async dispatch => {
    dispatch(setAppStatusActionCreator("loading"))
    try {
        let {data} = await authApi.logout()
        if (data.resultCode === 0) {
            dispatch(setIsAuthAC(false))
            dispatch(setAppStatusActionCreator("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}

//types

type AuthInitialStateType = {
    isAuth: boolean
}

type SetUserActionType = ReturnType<typeof setUserIdAC>
type SetUserDataActionType = ReturnType<typeof setUserDataAC>
type SetIsAuthActionType = ReturnType<typeof setIsAuthAC>

export type AuthActionTypes = SetUserActionType | SetUserDataActionType | SetIsAuthActionType
