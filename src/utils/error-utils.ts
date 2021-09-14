import {ResponseType} from "../api/todolists-api";
import {AxiosError} from "axios";
import {Dispatch} from "redux";
import { setAppError, setAppStatus } from "../app/app-reducer";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError('Some error occurred'))
    }
    dispatch(setAppStatus('failed'))
}

export const handleNetworkAppError = (error: AxiosError, dispatch: Dispatch) => {
    dispatch(setAppStatus("failed"))
    dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
}