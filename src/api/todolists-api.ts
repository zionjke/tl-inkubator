import axios from "axios";
import {TodolistType} from "../types/types";

const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
};

const APIInstance = axios.create(settings);



type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export const TodoListsApi = {
    getTodoLists() {
        return APIInstance.get<TodolistType[]>('')
    },
    createTodoList(title: string) {
        return APIInstance.post<ResponseType<{ item: TodolistType }>>('', {title});
    },
    deleteTodoList(todolistId: string) {
        return APIInstance.delete<ResponseType>(`/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return APIInstance.put<ResponseType>(`/${todolistId}`, {title})
    }
}
