import {TaskType} from "../../api/tasks-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { createTodoList, fetchTodoLists, removeTodoList } from "../todolists/todolists-actions";
import {createTask, fetchTasks, removeTask, updateTask } from "./tasks-actions";




const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {
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


export type RequestTaskStatusType = "idle" | "loading" | "failed" | "succeeded"
export type TaskDomainType = TaskType & {
    entityStatus: RequestTaskStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

export default tasksSlice.reducer
