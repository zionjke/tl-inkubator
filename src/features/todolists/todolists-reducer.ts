import {TodolistType} from "../../api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createTodoList, fetchTodoLists, removeTodoList, updateTodoListTitle} from "./todolists-actions";

const initialState: TodolistDomainType[] = []


export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
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



