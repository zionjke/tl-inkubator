import {GlobalStateType} from "../store";

export const selectStatus = (state:GlobalStateType) => state.app.status
export const selectIsInitialized = (state:GlobalStateType) => state.app.isInitialized