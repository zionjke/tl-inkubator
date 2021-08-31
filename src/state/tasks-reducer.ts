import {TaskStateType, TaskStatuses, TaskType} from "../types/types";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from "./todolists-reducer";
import {tasksApi, UpdateTaskModelType} from "../api/tasks-api";
import {AppThunk, GlobalStateType} from "./store";


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
        }
        case "TODOLIST/TASKS/UPDATE_TASK_STATUS": {
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
        case "TODOLIST/TASKS/CHANGE_TASK_TITLE": {
            return {
                ...tasks,
                [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }

        case "TODOLIST/CREATE_TODOLIST":
            return {
                ...tasks,
                [action.todoList.id]: []
            };
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


export const updateTaskStatusActionCreator = (todoListID: string, taskID: string, status: number) => {
    return {
        type: "TODOLIST/TASKS/UPDATE_TASK_STATUS",
        todoListID,
        taskID,
        status
    } as const
}


export const updateTaskTitleActionCreator = (todoListID: string, taskID: string, title: string) => {
    return {
        type: "TODOLIST/TASKS/CHANGE_TASK_TITLE",
        todoListID,
        taskID,
        title
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


export const fetchTasks = (todolistID: string): AppThunk => async (dispatch) => {
    try {
        let {data} = await tasksApi.getTasks(todolistID)
        dispatch(setTasksActionCreator(todolistID, data.items))
    } catch (e) {
        console.log(e)
    }
};

export const createTask = (todoListID: string, title: string): AppThunk => async (dispatch) => {
    try {
        let {data} = await tasksApi.createTask(todoListID, title);
        dispatch(createTaskActionCreator(todoListID, data.data.item))
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

export const updateTaskStatus = (todoListID: string, taskID: string, status: TaskStatuses): AppThunk => async (dispatch, getState: () => GlobalStateType) => {
    const appState = getState()
    const tasks = appState.tasks
    const taskForTodo = tasks[todoListID]
    const task = taskForTodo.find(t => t.id === taskID);
    if (task) {
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: status,
            title: task.title
        }
        try {
            await tasksApi.updateTask(todoListID, taskID, model);
            dispatch(updateTaskStatusActionCreator(todoListID, taskID, status))
        } catch (e) {
            console.log(e)
        }
    }

}

export const updateTaskTitle = (todoListID: string, taskID: string, title: string): AppThunk => async (dispatch, getState: () => GlobalStateType) => {
    const tasks = getState().tasks[todoListID]
    const task = tasks.find(t => t.id === taskID);
    if (task) {
        const model: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: title
        }
        try {
            await tasksApi.updateTask(todoListID, taskID, model);
            dispatch(updateTaskTitleActionCreator(todoListID, taskID, title))
        } catch (e) {
            console.log(e)
        }
    }

}


export type SetTasksActionType = ReturnType<typeof setTasksActionCreator>
export type AddNewTaskActionType = ReturnType<typeof createTaskActionCreator>
export type RemoveTaskActionType = ReturnType<typeof removeTaskActionCreator>
export type UpdateTaskStatusActionType = ReturnType<typeof updateTaskStatusActionCreator>
export type UpdateTaskTitleActionType = ReturnType<typeof updateTaskTitleActionCreator>


export type TasksActionsType =
    AddNewTaskActionType
    | UpdateTaskStatusActionType
    | RemoveTaskActionType
    | UpdateTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTasksActionType
    | SetTodolistActionType


