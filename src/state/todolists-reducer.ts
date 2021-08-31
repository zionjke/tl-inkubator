import {FilterValuesType, TodolistType} from "../types/types";
import {Dispatch} from "redux";
import {TodoListsApi} from "../api/todolists-api";
import {AppActionsType, AppThunk, GlobalStateType} from "./store";


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


export const setTodolistActionCreator = (todoLists: TodolistType[]) => {
    return {
        type: "TODOLIST/SET_TODOLISTS",
        todoLists
    } as const
}


export const updateTodoListTitleActionCreator = (todolistID: string, title: string) => {
    return {
        todolistID,
        title,
        type: "TODOLIST/CHANGE_TODOLIST_TITLE"
    } as const
}


export const addTodoListActionCreator = (todoList: TodolistType) => {
    return {
        todoList,
        type: "TODOLIST/CREATE_TODOLIST",
    } as const
};


export const removeTodoListActionCreator = (todolistID: string) => {
    return {
        todolistID,
        type: "TODOLIST/REMOVE_TODOLIST"
    } as const
};


export const changeTodoListFilterActionCreator = (todolistID: string, filter: FilterValuesType) => {
    return {
        todolistID,
        filter,
        type: "TODOLIST/CHANGE_TODOLIST_FILTER"
    } as const
}


export const fetchTodoLists = (): AppThunk => async dispatch => {
    try {
        let {data} = await TodoListsApi.getTodoLists();
        dispatch(setTodolistActionCreator(data))
    } catch (e) {
        console.log(e)
    }
};

export const createTodoListThunkCreator = (title: string): AppThunk => async (dispatch) => {
    try {
        let {data} = await TodoListsApi.createTodoList(title)
        dispatch(addTodoListActionCreator(data.data.item))
    } catch (e) {
        console.log(e)
    }
}


export const removeTodoListThunkCreator = (todolistID: string): AppThunk => async (dispatch) => {
    try {
        await TodoListsApi.deleteTodoList(todolistID)
        dispatch(removeTodoListActionCreator(todolistID))
    } catch (e) {
        console.log(e)
    }
}

export const updateTodoListTitleThunkCreator = (todolistID: string, title: string): AppThunk => async (dispatch) => {
    try {
        await TodoListsApi.updateTodolistTitle(todolistID, title);
        dispatch(updateTodoListTitleActionCreator(todolistID, title));
    } catch (e) {
        console.log(e)
    }
};

export type SetTodolistActionType = ReturnType<typeof setTodolistActionCreator>
export type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleActionCreator>
export type AddTodolistActionType = ReturnType<typeof addTodoListActionCreator>
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListActionCreator>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilterActionCreator>

export type TodolistsActionTypes = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodoListFilterActionType
    | UpdateTodoListTitleActionType
    | SetTodolistActionType
