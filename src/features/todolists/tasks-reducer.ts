import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {GlobalStateType} from "../../app/store";
import {handleNetworkAppError, handleServerAppError} from "../../utils/error-utils";
import {addTodolist, deleteTodolist, setTodolists} from "./todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "../../app/app-reducer";
import {Dispatch} from "redux";


const initialState: TasksStateType = {}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasks(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks.map((t) => {
                return {...t, entityStatus: 'idle'}
            })
        },
        deleteTask(state, action: PayloadAction<{ todolistId: string, taskId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTask(state, action: PayloadAction<{ todolistId: string, task: TaskType }>) {
            const tasks = state[action.payload.todolistId]
            tasks.unshift({...action.payload.task, entityStatus: 'idle'})
        },
        changeTask(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },
        changeTaskEntityStatus(state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: RequestTaskStatusType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.id] = []
        });
        builder.addCase(deleteTodolist, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(setTodolists, (state, action) => {
            action.payload.forEach(tl => {
                state[tl.id] = []
            })
        })
    }
})

export const {setTasks, deleteTask, addTask, changeTask, changeTaskEntityStatus} = tasksSlice.actions


export const fetchTasks = (todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await tasksApi.getTasks(todolistId)
        dispatch(setTasks({todolistId, tasks: data.items}))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
};
export const createTask = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        let {data} = await tasksApi.createTask(todolistId, title);
        if (data.resultCode === 0) {
            dispatch(addTask({todolistId, task: data.data.item}))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}
export const removeTask = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTaskEntityStatus({todolistId, taskId, entityStatus: 'loading'}))
    try {
        let {data} = await tasksApi.deleteTask(todolistId, taskId)
        if (data.resultCode === 0) {
            dispatch(deleteTask({todolistId, taskId}))
            dispatch(setAppStatus("succeeded"))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}
export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => async (dispatch: Dispatch, getState: () => GlobalStateType) => {
    const tasks = getState().tasks[todolistId]
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        console.warn('task not found in state')
        return;
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

    try {
        let {data} = await tasksApi.updateTask(todolistId, taskId, apiModel);
        if (data.resultCode === 0) {
            dispatch(changeTask({todolistId, taskId, model: domainModel}))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (e) {
        handleNetworkAppError(e, dispatch)
    }
}


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
