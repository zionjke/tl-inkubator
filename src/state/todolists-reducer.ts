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
    todoListId: string
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


export const todolistsReducer = (todoLists:TodoListType[] = [], action: TodolistsActionTypes): TodoListType[] => {
    switch (action.type) {
        case "TODOLIST/REMOVE_TODOLIST":
            return todoLists.filter(t => t.id !== action.todolistID);
        case "TODOLIST/ADD_TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "All"
            }
            return [...todoLists, newTodoList]

        case "TODOLIST/CHANGE_TODOLIST_FILTER": {
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
            // const todoList = todoLists.find(tl => tl.id === action.todolistID)
            // if (todoList) {
            //     todoList.filter = action.filter
            // }
            // return [...todoLists]
        }
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
        type: "TODOLIST/ADD_TODOLIST",
        todoListId: v1()
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
