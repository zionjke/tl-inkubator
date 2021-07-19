import {FilterValuesType, TodoListType} from "../types/types";

export type ActionTypes = 'TODOLIST/ADD_TODOLIST'
    | 'TODOLIST/CHANGE_TODOLIST_FILTER'
    | 'TODOLIST/REMOVE_TODOLIST'
    | 'TODOLIST/CHANGE_TODOLIST_TITLE'

export type TodolistActionTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodoListFilterActionType

export type RemoveTodolistActionType = {
    todolistID: string
    type: 'TODOLIST/REMOVE_TODOLIST'
}

export type AddTodolistActionType = {
    todoList: TodoListType
    type: 'TODOLIST/ADD_TODOLIST'
}

export type ChangeTodoListFilterActionType = {
    todolistID: string
    type: 'TODOLIST/CHANGE_TODOLIST_FILTER'
    filter: FilterValuesType
}


export const todolistsReducer = (todoLists: TodoListType[], action: TodolistActionTypes) => {
    switch (action.type) {
        case "TODOLIST/REMOVE_TODOLIST":
            return todoLists.filter(t => t.id !== action.todolistID)
        case "TODOLIST/ADD_TODOLIST":
            return todoLists = [...todoLists, action.todoList]
        case "TODOLIST/CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => {
                if (tl.id === action.todolistID) {
                    tl.filter = action.filter
                } else return {...tl}
            })
        default:
            return todoLists

    }
}
