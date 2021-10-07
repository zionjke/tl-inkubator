import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, UpdateTaskModelType} from "../../api/tasks-api";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {GlobalStateType} from "../../app/store";
import {changeTaskEntityStatus} from "./tasks-reducer";


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await tasksApi.getTasks(todolistId)
        const tasks = data.items
        dispatch(setAppStatus("succeeded"))
        return {todolistId, tasks}
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
})

export const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTaskEntityStatus({todolistId: param.todolistId, taskId: param.taskId, entityStatus: 'loading'}))
    try {
        let {data} = await tasksApi.deleteTask(param.todolistId, param.taskId)
        if (data.resultCode === 0) {
            const {todolistId, taskId} = param
            dispatch(setAppStatus("succeeded"))
            return {todolistId, taskId}
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
})

export const createTask = createAsyncThunk('tasks/createTask', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await tasksApi.createTask(param.todolistId, param.title);
        if (data.resultCode === 0) {
            const {todolistId} = param
            const task = data.data.item
            dispatch(setAppStatus("succeeded"))
            return {todolistId, task}
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
})

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {
    dispatch,
    rejectWithValue,
    getState
}) => {
    const {todolistId, taskId, domainModel} = param
    const state = getState() as GlobalStateType
    const tasks = state.tasks[todolistId]
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return rejectWithValue('task not found in state')
    }

    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        title: task.title,
        ...domainModel
    }
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await tasksApi.updateTask(todolistId, taskId, apiModel);
        if (data.resultCode === 0) {
            dispatch(setAppStatus("succeeded"))
            return param
        } else {
            handleServerAppError(data, dispatch)
            return rejectWithValue(null)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
        return rejectWithValue(e.message)
    }
})