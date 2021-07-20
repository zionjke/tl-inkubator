import {FilterValuesType, TodoListType} from "../types/types";


export type TodolistsActionTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

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

export type ChangeTodoListTitleActionType = {
    todolistID: string
    type: 'TODOLIST/CHANGE_TODOLIST_TITLE'
    title: string
}


export const todolistsReducer = (todoLists: TodoListType[], action: TodolistsActionTypes) => {
    switch (action.type) {
        case "TODOLIST/REMOVE_TODOLIST":
            return todoLists.filter(t => t.id !== action.todolistID)
        case "TODOLIST/ADD_TODOLIST":
            return todoLists = [...todoLists, action.todoList]
        case "TODOLIST/CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => {
                if (tl.id === action.todolistID) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        case "TODOLIST/CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        default:
            return todoLists

    }
}
