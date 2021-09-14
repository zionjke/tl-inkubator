import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import { setAppStatus } from "../../app/app-reducer";

const initialState = {
    isAuth: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsAuth(state,action:PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    }
})

export const authReducer = slice.reducer
export const {setIsAuth} = slice.actions


export const login = (loginData: LoginParamsType) => async (dispatch:Dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await authApi.login(loginData)
        if (data.resultCode === 0) {
            dispatch(setIsAuth(true))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}


export const logOut = () => async (dispatch:Dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await authApi.logout()
        if (data.resultCode === 0) {
            dispatch(setIsAuth(false))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}






