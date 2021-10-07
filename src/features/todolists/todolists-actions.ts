import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";
import {TodoListsApi} from "../../api/todolists-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {changeTodolistStatus} from "./todolists-reducer";

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
