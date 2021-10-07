import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "./app-actions";

const initialState: AppInitialStateType = {
    status: "idle", // происходит ли сейчас взаимодействие с сервером
    error: null, // текст ошибки если произойдет ошибка при запросе
    isInitialized: false // состояние инициализации приложения
}



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


//types
export type AppInitialStateType = {
    status: AppStatusesType,
    error: string | null
    isInitialized: boolean
}
export type AppStatusesType = "idle" | "loading" | "failed" | "succeeded"

export default appSlice.reducer