import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {login, logOut} from "./auth-actions";


const initialState = {
    isAuth: false
}

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




