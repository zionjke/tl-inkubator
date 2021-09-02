const initialState: AppInitialStateType = {
    status: "idle", // происходит ли сейчас взаимодействие с сервером
    error: null // текст ошибки если произойдет ошибка при запросе
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppReducerActionsTypes): AppInitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

//actions
export const setAppStatusActionCreator = (status: AppStatusesType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorActionCreator = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)


//types
export type AppStatusesType = "idle" | "loading" | "failed" | "succeeded"
export type AppInitialStateType = {
    status: AppStatusesType
    error: string | null
}


export type SetAppStatusActionType = ReturnType<typeof setAppStatusActionCreator>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorActionCreator>

export type AppReducerActionsTypes = SetAppErrorActionType | SetAppStatusActionType