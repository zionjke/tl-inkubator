import axios from "axios";

const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
};

const APIInstance = axios.create(settings);


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}


export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}


type TasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return APIInstance.get<TasksResponseType>(`${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return APIInstance.post<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return APIInstance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType ) {
        return APIInstance.put<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks/${taskId}`, model)
    }
};
