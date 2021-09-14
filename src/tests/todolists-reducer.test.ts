import {v1} from "uuid"
import {
    createTodoListActionCreator,
    updateTodoListFilterActionCreator,
    removeTodoListActionCreator, setTodolistsActionCreator, TodolistDomainType,
    todolistsReducer_old,
    updateTodoListTitleActionCreator
} from "../features/todolists/todolists-reducer_old";


let todoListId1: string;
let todoListId2: string;
let startState: TodolistDomainType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        {id: todoListId1, filter: "All", title: 'first todolist', addedDate: '', order: 0,entityStatus:"idle"},
        {id: todoListId2, filter: "All", title: 'second todolist', addedDate: '', order: 0,entityStatus:"idle"},
    ]
})

test(' todolist should be set to the state', () => {

    const endState = todolistsReducer_old([], setTodolistsActionCreator(startState))

    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todoListId2)
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer_old(startState, removeTodoListActionCreator(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer_old(startState, createTodoListActionCreator({
        id: 'todoListId3',
        title: 'third todolist',
        addedDate: '',
        order: 0
    },))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('third todolist')
})

test('todolist filter should be updated', () => {

    const endState = todolistsReducer_old(startState, updateTodoListFilterActionCreator(todoListId1, "Completed"))

    expect(endState[0].filter).toBe('Completed')
});


test('todolist title should be updated', () => {

    const endState = todolistsReducer_old(startState, updateTodoListTitleActionCreator(todoListId2, 'Updated Title'))

    expect(endState[1].title).toBe('Updated Title')
});
