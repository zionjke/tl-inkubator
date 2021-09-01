import {FilterValuesType, TodolistType} from "../types/types";
import {TodoListsApi} from "../api/todolists-api";
import { AppThunk} from "./store";


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (todoLists = initialState, action: TodolistsActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "TODOLIST/SET_TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "All"})) // добавляем св-во filter в массив обьектов тудулистов
        case "TODOLIST/CREATE_TODOLIST":
            let newTodoList: TodolistDomainType = {
                ...action.todoList,
                filter: "All"
            };
            return [...todoLists, newTodoList];
        case "TODOLIST/REMOVE_TODOLIST":
            return todoLists.filter(t => t.id !== action.todolistID);
        case "TODOLIST/UPDATE_TODOLIST_FILTER": {
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
        }
        case "TODOLIST/UPDATE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}


export const setTodolistActionCreator = (todoLists: TodolistType[]) => ({type: "TODOLIST/SET_TODOLISTS", todoLists}) as const
export const updateTodoListTitleActionCreator = (todolistID: string, title: string) => ({todolistID, title, type: "TODOLIST/UPDATE_TODOLIST_TITLE"}) as const
export const createTodoListActionCreator = (todoList: TodolistType) => ({todoList, type: "TODOLIST/CREATE_TODOLIST",}) as const
export const removeTodoListActionCreator = (todolistID: string) => ({todolistID, type: "TODOLIST/REMOVE_TODOLIST"}) as const
export const updateTodoListFilterActionCreator = (todolistID: string, filter: FilterValuesType) => ({todolistID, filter, type: "TODOLIST/UPDATE_TODOLIST_FILTER"}) as const

export type SetTodolistActionType = ReturnType<typeof setTodolistActionCreator>
export type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleActionCreator>
export type CreateTodolistActionType = ReturnType<typeof createTodoListActionCreator>
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListActionCreator>
export type UpdateTodoListFilterActionType = ReturnType<typeof updateTodoListFilterActionCreator>


export const fetchTodoLists = (): AppThunk => async dispatch => {
    try {
        let {data} = await TodoListsApi.getTodoLists();
        dispatch(setTodolistActionCreator(data))
    } catch (e) {
        console.log(e)
    }
};

export const createTodoList = (title: string): AppThunk => async dispatch => {
    try {
        let {data} = await TodoListsApi.createTodoList(title)
        dispatch(createTodoListActionCreator(data.data.item))
    } catch (e) {
        console.log(e)
    }
}


export const removeTodoList = (todolistID: string): AppThunk => async dispatch => {
    try {
        await TodoListsApi.deleteTodoList(todolistID)
        dispatch(removeTodoListActionCreator(todolistID))
    } catch (e) {
        console.log(e)
    }
}

export const updateTodoListTitle = (todolistID: string, title: string): AppThunk => async dispatch => {
    try {
        await TodoListsApi.updateTodolistTitle(todolistID, title);
        dispatch(updateTodoListTitleActionCreator(todolistID, title));
    } catch (e) {
        console.log(e)
    }
};



export type TodolistsActionTypes = RemoveTodolistActionType
    | CreateTodolistActionType
    | UpdateTodoListFilterActionType
    | UpdateTodoListTitleActionType
    | SetTodolistActionType
