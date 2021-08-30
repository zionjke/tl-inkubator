import {TaskStateType, TaskType} from "../types/types";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {tasksApi} from "../api/tasks-api";


export type ChangeTaskStatusActionType = {
    taskID: string
    todoListID: string
    status: number
    type: 'TODOLIST/TASKS/CHANGE_TASK_STATUS'
}


export type ChangeTaskTitleActionType = {
    taskID: string
    todoListID: string
    title: string
    type: 'TODOLIST/TASKS/CHANGE_TASK_TITLE'
}


const initialState: TaskStateType = {}

export const tasksReducer = (tasks = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case "TODOLIST/SET_TODOLISTS": // создаем для каждого массива тасок ключ в обьекте (ассоциативній массив)
            const tasksCopy = {...tasks}
            action.todoLists.forEach(tl => {
                tasksCopy[tl.id] = []
            })
            return tasksCopy
        case "TODOLIST/TASKS/SET_TASKS":
            return {
                ...tasks,
                [action.todolistID]: action.tasks
            }
        case "TODOLIST/TASKS/ADD_NEW_TASK": {
            return {
                ...tasks,
                [action.todoListID]: [...tasks[action.todoListID], action.task]
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
                    status: action.status
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

        // case "TODOLIST/ADD_TODOLIST": {
        //     return {
        //         ...tasks,
        //         [action.todoListId]: []
        //     }
        // }
        case "TODOLIST/CREATE_TODOLIST":
            return {
                ...tasks,
                [action.todoList.id]: []
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


export const changeTaskStatusActionCreator = (todoListID: string, taskID: string, status: number): ChangeTaskStatusActionType => {
    return {
        type: "TODOLIST/TASKS/CHANGE_TASK_STATUS",
        todoListID,
        taskID,
        status
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

export const setTasksActionCreator = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: "TODOLIST/TASKS/SET_TASKS",
        todolistID,
        tasks
    } as const
}

export const createTaskActionCreator = (todoListID: string, task: TaskType) => {
    return {
        type: "TODOLIST/TASKS/ADD_NEW_TASK",
        task,
        todoListID
    } as const
}

export const removeTaskActionCreator = (todoListID: string, taskID: string) => {
    return {
        type: "TODOLIST/TASKS/REMOVE_TASK",
        todoListID,
        taskID
    } as const
}


export const fetchTasks = (todolistID: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await tasksApi.getTasks(todolistID)
        dispatch(setTasksActionCreator(todolistID, data.items))
    } catch (e) {
        console.log(e)
    }
};

export const createTask = (todoListID: string, title: string) => async (dispatch: Dispatch) => {
    try {
        let {data} = await tasksApi.createTask(todoListID, title);
        dispatch(createTaskActionCreator(todoListID, data.data.item))
    } catch (e) {
        console.log(e)
    }
}

export const removeTask = (todoListID: string, taskID: string) => async (dispatch: Dispatch) => {
    try {
        await tasksApi.deleteTask(todoListID, taskID)
        dispatch(removeTaskActionCreator(todoListID, taskID))
    } catch (e) {
        console.log(e)
    }
}


export type SetTasksActionType = ReturnType<typeof setTasksActionCreator>
export type AddNewTaskActionType = ReturnType<typeof createTaskActionCreator>
export type RemoveTaskActionType = ReturnType<typeof removeTaskActionCreator>

export type TasksActionsType =
    AddNewTaskActionType
    | ChangeTaskStatusActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTasksActionType
    | SetTodolistActionType

