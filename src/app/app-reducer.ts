import {authApi} from "../api/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsAuth} from "../features/login/auth-reducer";

const initialState: AppInitialStateType = {
    status: "idle", // происходит ли сейчас взаимодействие с сервером
    error: null, // текст ошибки если произойдет ошибка при запросе
    isInitialized: false // состояние инициализации приложения
}

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

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatus(state, action: PayloadAction<AppStatusesType>) {
            state.status = action.payload
        },
        setAppError(state, action: PayloadAction<string | null>) {
            state.error = action.payload
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    }
})


export const {setAppStatus, setAppError} = appSlice.actions


// export const initializeApp = () => async (dispatch: Dispatch) => {
//     try {
//         let {data} = await authApi.authMe()
//         if (data.resultCode === 0) {
//             dispatch(setIsAuth(true))
//         } else {
//             handleServerAppError(data, dispatch)
//         }
//     } catch (e) {
//         handleNetworkAppError(e, dispatch)
//     }
//     dispatch(setIsInitialized(true))
// }

//types
export type AppInitialStateType = {
    status: AppStatusesType,
    error: string | null
    isInitialized: boolean
}
export type AppStatusesType = "idle" | "loading" | "failed" | "succeeded"

export default appSlice.reducer