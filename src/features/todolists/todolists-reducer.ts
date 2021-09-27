import {TodoListsApi, TodolistType} from "../../api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {setAppStatus} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TodolistDomainType[] = []

export const fetchTodoLists = createAsyncThunk('todolists/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await TodoListsApi.getTodoLists();
        dispatch(setAppStatus("succeeded"))
        return data
    } catch (e) {
        dispatch(setAppStatus("failed"))
        return rejectWithValue(null)
    }
})

export const createTodoList = createAsyncThunk('todolists/createTodolist', async (title: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await TodoListsApi.createTodoList(title)
        if (data.resultCode === 0) {
            const todolist = data.data.item
            dispatch(setAppStatus("succeeded"))
            return todolist
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
})

export const removeTodoList = createAsyncThunk('todolists/removeTodolist', async (todolistID: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistStatus({id: todolistID, entityStatus: "loading"}))
    try {
        let {data} = await TodoListsApi.deleteTodoList(todolistID)
        if (data.resultCode === 0) {
            dispatch(setAppStatus("succeeded"))
            return {id: todolistID}
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
})

export const updateTodoListTitle = createAsyncThunk('todolists/updateTodolistTitle', async (param: { todolistID: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    const {todolistID, title} = param
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await TodoListsApi.updateTodolistTitle(todolistID, title);
        if (data.resultCode === 0) {
            dispatch(setAppStatus("succeeded"))
            return {todolistID, title}
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
});


const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        // setTodolists(state, action: PayloadAction<TodolistType[]>) {
        //     return action.payload.map(tl => ({...tl, filter: "All", entityStatus: "idle"}))
        // },
        // addTodolist(state, action: PayloadAction<TodolistType>) {
        //     state.unshift({...action.payload, filter: 'All', entityStatus: 'idle'})
        // },
        // deleteTodolist(state, action: PayloadAction<{ id: string }>) {
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     if (index > -1) {
        //         state.splice(index, 1)
        //     }
        // },
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
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            return action.payload.map(tl => ({...tl, filter: "All", entityStatus: "idle"}))
        });
        builder.addCase(createTodoList.fulfilled, (state, action) => {
            state.unshift({...action.payload, filter: 'All', entityStatus: 'idle'})
        });
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        });
        builder.addCase(updateTodoListTitle.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistID)
            state[index].title = action.payload.title
        });
    }
})

export const {
    changeTodolistFilter,
    changeTodolistStatus,
} = todolistsSlice.actions


export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type RequestTodoListsStatusType = "idle" | "loading" | "failed" | "succeeded"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestTodoListsStatusType
}


export default todolistsSlice.reducer



