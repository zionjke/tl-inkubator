import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {GlobalStateType} from "../../app/store";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {createTodoList, fetchTodoLists, removeTodoList} from "./todolists-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";


const initialState: TasksStateType = {}

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

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
        //     state[action.payload.todolistId] = action.payload.tasks.map((t) => {
        //         return {...t, entityStatus: 'idle'}
        //     })
        // },
        // deleteTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks.splice(index, 1)
        //     }
        // },
        // addTask(state, action: PayloadAction<{ todolistId: string, task: TaskType }>) {
        //     const tasks = state[action.payload.todolistId]
        //     tasks.unshift({...action.payload.task, entityStatus: 'idle'})
        // },
        // changeTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     tasks[index] = {...tasks[index], ...action.payload.model}
        // },
        changeTaskEntityStatus(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestTaskStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTodoList.fulfilled, (state, action) => {
            state[action.payload.id] = []
        });
        builder.addCase(removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodoLists.fulfilled, (state, action) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map((t) => {
                return {...t, entityStatus: 'idle'}
            })
        });
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks.splice(index, 1)
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            tasks.unshift({...action.payload.task, entityStatus: 'idle'})
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.domainModel}
        })
    }
})

export const {changeTaskEntityStatus} = tasksSlice.actions

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type RequestTaskStatusType = "idle" | "loading" | "failed" | "succeeded"
export type TaskDomainType = TaskType & {
    entityStatus: RequestTaskStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

export default tasksSlice.reducer
