import {TaskStateType, TaskType} from "../types/types";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type AddNewTaskActionType = {
    title: string
    todoListID: string
    type: 'TODOLIST/TASKS/ADD_NEW_TASK'
}

export type ChangeTaskStatusActionType = {
    taskID: string
    todoListID: string
    status: boolean
    type: 'TODOLIST/TASKS/CHANGE_TASK_STATUS'
}

export type RemoveTaskActionType = {
    taskID: string
    todoListID: string
    type: 'TODOLIST/TASKS/REMOVE_TASK'
}

export type ChangeTaskTitleActionType = {
    taskID: string
    todoListID: string
    title: string
    type: 'TODOLIST/TASKS/CHANGE_TASK_TITLE'
}

export type TasksActionsType =
    AddNewTaskActionType
    | ChangeTaskStatusActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType | AddTodolistActionType



export const tasksReducer = (tasks: TaskStateType = {}, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case "TODOLIST/TASKS/ADD_NEW_TASK": {
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...tasks,
                [action.todoListID]: [...tasks[action.todoListID], newTask]
            }
            // tasks[action.todoListID] = [...tasks[action.todoListID], newTask]
            // return {...tasks}
        }
        case "TODOLIST/TASKS/CHANGE_TASK_STATUS": {
            // const task = tasks[action.todoListID].find(task => task.id === action.taskID)
            // if (task) {
            //     task.isDone = action.status
            // }
            // return {...tasks}
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map((t) => t.id === action.taskID ? {
                    ...t,
                    isDone: action.status
                } : t)
            }
        }
        case "TODOLIST/TASKS/REMOVE_TASK": {
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].filter((task => task.id !== action.taskID))
            }
        }
        // let copyTasks = {...tasks}
        // copyTasks[action.todoListID] = copyTasks[action.todoListID].filter(task => task.id !== action.taskID)
        // return copyTasks

        // tasks[action.todoListID] = tasks[action.todoListID].filter(t => t.id !== action.taskID)
        // return {...tasks}
        case "TODOLIST/TASKS/CHANGE_TASK_TITLE": {
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        // const task = tasks[action.todoListID].find(task => task.id === action.taskID)
        // if (task) {
        //     task.title = action.title
        // }
        // return {...tasks}

        case "TODOLIST/ADD_TODOLIST": {
            return {
                ...tasks,
                [action.todoListId]: []
            }
        }
        case "TODOLIST/REMOVE_TODOLIST": {
            let copyTasks = {...tasks}
            delete copyTasks[action.todolistID]
            return copyTasks
        }
        // delete tasks[action.todolistID]
        // return {...tasks}
        default:
            return tasks
    }
}


export const addNewTaskActionCreator = (todoListID: string, title: string,): AddNewTaskActionType => {
    return {
        type: "TODOLIST/TASKS/ADD_NEW_TASK",
        title,
        todoListID
    }
}

export const changeTaskStatusActionCreator = (todoListID: string, taskID: string, status: boolean): ChangeTaskStatusActionType => {
    return {
        type: "TODOLIST/TASKS/CHANGE_TASK_STATUS",
        todoListID,
        taskID,
        status
    }
}

export const removeTaskActionCreator = (todoListID: string, taskID: string): RemoveTaskActionType => {
    return {
        type: "TODOLIST/TASKS/REMOVE_TASK",
        todoListID,
        taskID
    }
}

export const changeTaskTitleActionCreator = (todoListID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {
        type: "TODOLIST/TASKS/CHANGE_TASK_TITLE",
        todoListID,
        taskID,
        title
    }
}
