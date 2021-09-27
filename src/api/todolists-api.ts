import axios from "axios";


export const settings = {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {"API-KEY": "db79da77-d4ed-4333-9c43-3bf4d5e71c39"}
};

export const APIInstance = axios.create(settings);


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type FieldsErrorsType = {
    field: string,
    error: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldsErrorsType[]
    data: D
}

export const TodoListsApi = {
    getTodoLists() {
        return APIInstance.get<TodolistType[]>('/todo-lists/')
    },
    createTodoList(title: string) {
        return APIInstance.post<ResponseType<{ item: TodolistType }>>('/todo-lists/', {title});
    },
    deleteTodoList(todolistId: string) {
        return APIInstance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return APIInstance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
    }
}
