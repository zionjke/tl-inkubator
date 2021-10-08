import {createAsyncThunk} from "@reduxjs/toolkit";
import {authApi, LoginParamsType} from "../../api/auth-api";
import {FieldsErrorsType} from "../../api/todolists-api";
import {setAppStatus} from "../../app/app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";

export const login = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: string[], fieldsErrors?: FieldsErrorsType[] } }>('auth/auth', async (loginData, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await authApi.login(loginData)
        if (data.resultCode === 0) {
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue({errors: e.message, fieldsErrors: undefined})
    }
})

export const logOut = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await authApi.logout()
        if (data.resultCode === 0) {
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue({})
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue({})
    }
})