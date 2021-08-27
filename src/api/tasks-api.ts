import axios from "axios";
import {TaskType} from "../types/types";

const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
};

const APIInstance = axios.create(settings);


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
    updateTask(todolistId: string, taskId: string, title: string, status: number) {
        return APIInstance.put<ResponseType<{ item: TaskType }>>(`${todolistId}/tasks/${taskId}`, {
            title: title,
            status: status
        })
    }
}
