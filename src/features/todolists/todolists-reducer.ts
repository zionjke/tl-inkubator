import {TodoListsApi, TodolistType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";
import {setAppErrorActionCreator, setAppStatusActionCreator} from "../../app/app-reducer";
import {AxiosError} from "axios";

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (todoLists = initialState, action: TodolistsActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "TODOLIST/SET_TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "All", entityStatus: "idle"})) // добавляем св-во filter и status в массив обьектов тудулистов
        case "TODOLIST/CREATE_TODOLIST":
            let newTodoList: TodolistDomainType = {
                ...action.todoList,
                filter: "All",
                entityStatus: "idle"
            };
            return [...todoLists, newTodoList];
        case "TODOLIST/REMOVE_TODOLIST":
            return todoLists.filter(t => t.id !== action.todolistID);
        case "TODOLIST/UPDATE_TODOLIST_FILTER": {
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.filter} : tl)
        }
        case "TODOLIST/UPDATE_TODOLIST_STATUS": {
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, entityStatus: action.status} : tl)
        }
        case "TODOLIST/UPDATE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl);
        default:
            return todoLists
    }
}

//actions
export const setTodolistsActionCreator = (todoLists: TodolistType[]) => ({
    type: "TODOLIST/SET_TODOLISTS",
    todoLists
}) as const
export const updateTodoListTitleActionCreator = (todolistID: string, title: string) => ({
    todolistID,
    title,
    type: "TODOLIST/UPDATE_TODOLIST_TITLE"
}) as const
export const createTodoListActionCreator = (todoList: TodolistType) => ({
    todoList,
    type: "TODOLIST/CREATE_TODOLIST",
}) as const
export const removeTodoListActionCreator = (todolistID: string) => ({
    todolistID,
    type: "TODOLIST/REMOVE_TODOLIST"
}) as const
export const updateTodoListFilterActionCreator = (todolistID: string, filter: FilterValuesType) => ({
    todolistID,
    filter,
    type: "TODOLIST/UPDATE_TODOLIST_FILTER"
}) as const

export const updateTodoListEntityStatusActionCreator = (todolistID: string, status: RequestTodoListsStatusType) => ({
    todolistID,
    status,
    type: "TODOLIST/UPDATE_TODOLIST_STATUS"
}) as const


//types
export type SetTodolistActionType = ReturnType<typeof setTodolistsActionCreator>
export type UpdateTodoListTitleActionType = ReturnType<typeof updateTodoListTitleActionCreator>
export type CreateTodolistActionType = ReturnType<typeof createTodoListActionCreator>
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListActionCreator>
export type UpdateTodoListFilterActionType = ReturnType<typeof updateTodoListFilterActionCreator>
export type UpdateTodoListStatusActionType = ReturnType<typeof updateTodoListEntityStatusActionCreator>

export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type RequestTodoListsStatusType = "idle" | "loading" | "failed" | "succeeded"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestTodoListsStatusType
}

export type TodolistsActionTypes = RemoveTodolistActionType
    | CreateTodolistActionType
    | UpdateTodoListFilterActionType
    | UpdateTodoListTitleActionType
    | SetTodolistActionType
    | UpdateTodoListStatusActionType

//thunks
export const fetchTodoLists = (): AppThunk => async dispatch => {
    dispatch(setAppStatusActionCreator("loading"))
    try {
        let {data} = await TodoListsApi.getTodoLists();
        dispatch(setTodolistsActionCreator(data))
        dispatch(setAppStatusActionCreator("succeeded"))
    } catch (e) {
        dispatch(setAppStatusActionCreator("failed"))
        dispatch(setAppErrorActionCreator(e.message))
    }
};
export const createTodoList = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusActionCreator("loading"))
    try {
        let {data} = await TodoListsApi.createTodoList(title)
        if (data.resultCode === 0) {
            dispatch(createTodoListActionCreator(data.data.item))
            dispatch(setAppStatusActionCreator("succeeded"))
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorActionCreator(data.messages[0]))
                dispatch(setAppStatusActionCreator("failed"))
            }
        }
    } catch (e) {
        dispatch(setAppStatusActionCreator("failed"))
        dispatch(setAppErrorActionCreator(e.message))
    }
}
export const removeTodoList = (todolistID: string): AppThunk => async dispatch => {
    dispatch(setAppStatusActionCreator("loading"))
    dispatch(updateTodoListEntityStatusActionCreator(todolistID, 'loading'))
    try {
        let {data} = await TodoListsApi.deleteTodoList(todolistID)
        debugger
        if (data.resultCode === 0) {
            dispatch(removeTodoListActionCreator(todolistID))
            dispatch(setAppStatusActionCreator("succeeded"))
        } else {
            if (data.messages.length) {
                dispatch(setAppErrorActionCreator(data.messages[0]))
            }
        }

    } catch (e) {
        dispatch(setAppStatusActionCreator("failed"))
        dispatch(setAppErrorActionCreator(e.message))
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




