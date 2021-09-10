import {AppReducerActionsTypes, setAppErrorActionCreator, setAppStatusActionCreator} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppReducerActionsTypes>) => {
    if (data.messages.length) {
        dispatch(setAppErrorActionCreator(data.messages[0]))
    } else {
        dispatch(setAppErrorActionCreator('Some error occurred'))
    }
    dispatch(setAppStatusActionCreator('failed'))
}

export const handleNetworkAppError = (error: AxiosError, dispatch: Dispatch<AppReducerActionsTypes>) => {
    dispatch(setAppStatusActionCreator("failed"))
    dispatch(setAppErrorActionCreator(error.message ? error.message : 'Some error occurred'))
}