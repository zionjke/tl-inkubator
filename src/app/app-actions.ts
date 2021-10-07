import {createAsyncThunk} from "@reduxjs/toolkit";
import {authApi} from "../api/auth-api";
import {setIsAuth} from "../features/auth/auth-reducer";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";

export const initializeApp = createAsyncThunk('app/initialize', async (param, {dispatch, rejectWithValue}) => {
    try {
        let {data} = await authApi.authMe()
        if (data.resultCode === 0) {
            dispatch(setIsAuth(true))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
})