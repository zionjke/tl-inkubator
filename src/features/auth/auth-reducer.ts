import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";
import {FieldsErrorsType} from "../../api/todolists-api";


const initialState = {
    isAuth: false
}

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

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.isAuth = false
        })
    }
})

export const authReducer = slice.reducer
export const {setIsAuth} = slice.actions


// export const auth = (loginData: LoginParamsType) => async (dispatch:Dispatch) => {
//     dispatch(setAppStatus("loading"))
//     try {
//         let {data} = await authApi.auth(loginData)
//         if (data.resultCode === 0) {
//             dispatch(setIsAuth(true))
//             dispatch(setAppStatus("succeeded"))
//         } else {
//             handleServerAppError(data, dispatch)
//         }
//     } catch (e) {
//         handleNetworkAppError(e, dispatch)
//     }
// }


// export const logOut = () => async (dispatch: Dispatch) => {
//     dispatch(setAppStatus("loading"))
//     try {
//         let {data} = await authApi.logout()
//         if (data.resultCode === 0) {
//             dispatch(setIsAuth(false))
//             dispatch(setAppStatus("succeeded"))
//         } else {
//             handleServerAppError(data, dispatch)
//         }
//     } catch (e) {
//         handleNetworkAppError(e, dispatch)
//     }
// }
//





