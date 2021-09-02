import {CreateTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {TaskPriorities, tasksApi, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {AppThunk, GlobalStateType} from "../../app/store";
import {setAppErrorActionCreator, setAppStatusActionCreator} from "../../app/app-reducer";


const initialState: TaskStateType = {}

export const tasksReducer = (tasks = initialState, action: TasksActionsType): TaskStateType => {
    switch (action.type) {
        case "TODOLIST/SET_TODOLISTS": // создаем для каждого массива тасок ключ в обьекте (ассоциативній массив)
            const tasksCopy = {...tasks}
            action.todoLists.forEach(tl => {
                tasksCopy[tl.id] = []
            })
            return tasksCopy
        case "TODOLIST/CREATE_TODOLIST":
            return {
                ...tasks,
                [action.todoList.id]: []
            };
        case "TODOLIST/REMOVE_TODOLIST": {
            let copyTasks = {...tasks}
            delete copyTasks[action.todolistID]
            return copyTasks
            // delete tasks[action.todolistID]
            // return {...tasks}
        }
        case "TODOLIST/TASKS/SET_TASKS":
            return {
                ...tasks,
                [action.todolistID]: action.tasks
            }
        case "TODOLIST/TASKS/CREATE_TASK": {
            return {
                ...tasks,
                [action.todoListID]: [...tasks[action.todoListID], action.task]
            }
        }
        case "TODOLIST/TASKS/REMOVE_TASK": {
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].filter((task => task.id !== action.taskID))
            }
        }
        case "TODOLIST/TASKS/UPDATE_TASK":
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        // case "TODOLIST/TASKS/UPDATE_TASK_STATUS": {
        //     return {
        //         ...tasks,
        //         [action.todoListID]: tasks[action.todoListID].map((t) => t.id === action.taskID ? {
        //             ...t,
        //             status: action.status
        //         } : t)
        //     }
        // }

        // case "TODOLIST/TASKS/UPDATE_TASK_TITLE": {
        //     return {
        //         ...tasks,
        //         [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {
        //             ...t,
        //             title: action.title
        //         } : t)
        //     }
        // }
        default:
            return tasks
    }
}


// export const updateTaskStatusActionCreator = (todoListID: string, taskID: string, status: number) => {
//     return {
//         type: "TODOLIST/TASKS/UPDATE_TASK_STATUS",
//         todoListID,
//         taskID,
//         status
//     } as const
// }

// export const updateTaskTitleActionCreator = (todoListID: string, taskID: string, title: string) => {
//     return {
//         type: "TODOLIST/TASKS/UPDATE_TASK_TITLE",
//         todoListID,
//         taskID,
//         title
//     } as const
// }

export const updateTaskActionCreator = (todoListID: string, taskID: string, model: UpdateDomainTaskModelType) => {
    return {
        type: "TODOLIST/TASKS/UPDATE_TASK",
        todoListID,
        taskID,
        model
    } as const
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
        type: "TODOLIST/TASKS/CREATE_TASK",
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


export const fetchTasks = (todolistID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusActionCreator("loading"))
    try {
        let {data} = await tasksApi.getTasks(todolistID)
        dispatch(setTasksActionCreator(todolistID, data.items))
        dispatch(setAppStatusActionCreator("succeeded"))
    } catch (e) {
        dispatch(setAppStatusActionCreator("failed"))
        console.log(e)
    }
};

export const createTask = (todoListID: string, title: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusActionCreator("loading"))
    try {
        let {data} = await tasksApi.createTask(todoListID, title);
        if (data.resultCode === 0) {
            dispatch(createTaskActionCreator(todoListID, data.data.item))
            dispatch(setAppStatusActionCreator("succeeded"))
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorActionCreator(data.messages[0]))
                dispatch(setAppStatusActionCreator("failed"))
            }
        }
    } catch (e) {
        console.log(e)
    }
}

export const removeTask = (todoListID: string, taskID: string): AppThunk => async (dispatch) => {
    try {
        await tasksApi.deleteTask(todoListID, taskID)
        dispatch(removeTaskActionCreator(todoListID, taskID))
    } catch (e) {
        console.log(e)
    }
}

// export const updateTaskStatus = (todoListID: string, taskID: string, status: TaskStatuses): AppThunk => async (dispatch, getState: () => GlobalStateType) => {
//     const tasks = getState().tasks[todoListID]
//     const task = tasks.find(t => t.id === taskID);
//
//     if (!task) {
//         console.warn('task not found in state')
//         return;
//     }
//
//     const model: UpdateTaskModelType = {
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         status: status,
//         title: task.title
//     }
//
//     try {
//         await tasksApi.updateTask(todoListID, taskID, model);
//         dispatch(updateTaskStatusActionCreator(todoListID, taskID, status))
//     } catch (e) {
//         console.log(e)
//     }
//
// }

// export const updateTaskTitle = (todoListID: string, taskID: string, title: string): AppThunk => async (dispatch, getState: () => GlobalStateType) => {
//     const tasks = getState().tasks[todoListID]
//     const task = tasks.find(t => t.id === taskID);
//
//     if (!task) {
//         console.warn('task not found in state')
//         return;
//     }
//
//     const model: UpdateTaskModelType = {
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         status: task.status,
//         title: title
//     }
//
//     try {
//         await tasksApi.updateTask(todoListID, taskID, model);
//         dispatch(updateTaskTitleActionCreator(todoListID, taskID, title))
//     } catch (e) {
//         console.log(e)
//     }
// }

export const updateTask = (todoListID: string, taskID: string, domainModel: UpdateDomainTaskModelType): AppThunk => async (dispatch, getState: () => GlobalStateType) => {
    const tasks = getState().tasks[todoListID]
    const task = tasks.find(t => t.id === taskID);

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
        await tasksApi.updateTask(todoListID, taskID, apiModel);
        dispatch(updateTaskActionCreator(todoListID, taskID, domainModel))
    } catch (e) {
        console.log(e)
    }
}


export type SetTasksActionType = ReturnType<typeof setTasksActionCreator>
export type CreateTaskActionType = ReturnType<typeof createTaskActionCreator>
export type RemoveTaskActionType = ReturnType<typeof removeTaskActionCreator>
export type UpdateTaskActionType = ReturnType<typeof updateTaskActionCreator>


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}


export type TasksActionsType = CreateTaskActionType
    | RemoveTaskActionType
    | RemoveTodolistActionType
    | CreateTodolistActionType
    | SetTasksActionType
    | SetTodolistActionType
    | UpdateTaskActionType


