import {FilterValuesType, TodoListType} from "../types/types";
import {v1} from "uuid";


export type TodolistsActionTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

export type RemoveTodolistActionType = {
    todolistID: string
    type: 'TODOLIST/REMOVE_TODOLIST'
}

export type AddTodolistActionType = {
    title: string
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
            const newTodoList = {
                id: v1(),
                title: action.title,
                filter: "All"
            }
            return [...todoLists, newTodoList]
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

export const removeTodoListActionCreator = (todolistID: string): RemoveTodolistActionType => {
    return {
        todolistID,
        type: "TODOLIST/REMOVE_TODOLIST"
    }
}

export const addTodoListActionCreator = (title: string): AddTodolistActionType => {
    return {
        title,
        type: "TODOLIST/ADD_TODOLIST"
    }
}

export const changeTodoListFilterActionCreator = (todolistID: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {
        todolistID,
        filter,
        type: "TODOLIST/CHANGE_TODOLIST_FILTER"
    }
}


export const changeTodoListTitleActionCreator = (todolistID: string, title: string): ChangeTodoListTitleActionType => {
    return {
        todolistID,
        title,
        type: "TODOLIST/CHANGE_TODOLIST_TITLE"
    }
}
