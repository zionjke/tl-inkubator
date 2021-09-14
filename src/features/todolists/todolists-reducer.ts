import {TodoListsApi, TodolistType} from "../../api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {setAppStatus} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistDomainType[] = []


const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        setTodolists(state, action: PayloadAction<TodolistType[]>) {
            return action.payload.map(tl => ({...tl, filter: "All", entityStatus: "idle"}))
        },
        addTodolist(state, action: PayloadAction<TodolistType>) {
            state.unshift({...action.payload, filter: 'All', entityStatus: 'idle'})
        },
        deleteTodolist(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index < -1) {
                state.splice(index, 1)
            }
        },
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistStatus(state, action: PayloadAction<{ id: string, entityStatus: RequestTodoListsStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        changeTodolistTitle(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
    }
})

export const {setTodolists, addTodolist, deleteTodolist, changeTodolistFilter, changeTodolistStatus, changeTodolistTitle} = todolistsSlice.actions


export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type RequestTodoListsStatusType = "idle" | "loading" | "failed" | "succeeded"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestTodoListsStatusType
}


//thunks
export const fetchTodoLists = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await TodoListsApi.getTodoLists();
        dispatch(setTodolists(data))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        dispatch(setAppStatus("failed"))
        console.log(e)
    }
};
export const createTodoList = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await TodoListsApi.createTodoList(title)
        if (data.resultCode === 0) {
            dispatch(addTodolist(data.data.item))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}
export const removeTodoList = (todolistID: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistStatus({id: todolistID, entityStatus: "loading"}))
    try {
        let {data} = await TodoListsApi.deleteTodoList(todolistID)
        if (data.resultCode === 0) {
            dispatch(deleteTodolist({id: todolistID}))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }

    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}
export const updateTodoListTitle = (todolistID: string, title: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await TodoListsApi.updateTodolistTitle(todolistID, title);
        if (data.resultCode === 0) {
            dispatch(changeTodolistTitle({id: todolistID, title: title}));
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
};

export default todolistsSlice.reducer



