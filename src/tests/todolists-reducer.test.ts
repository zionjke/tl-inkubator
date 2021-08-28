import {v1} from "uuid"
import {
    addTodoListActionCreator,
    changeTodoListFilterActionCreator,
    changeTodoListTitleActionCreator,
    removeTodoListActionCreator, TodolistDomainType,
    todolistsReducer
} from "../state/todolists-reducer";


let todoListId1: string;
let todoListId2: string;
let startState: TodolistDomainType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        {id: todoListId1, filter: "All", title: 'first todolist', addedDate: '', order: 0},
        {id: todoListId2, filter: "All", title: 'second todolist', addedDate: '', order: 0},
    ]
})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodoListActionCreator(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {

    const endState = todolistsReducer(startState, addTodoListActionCreator('third todo'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('third todo')
})

test('todolist filter should be updated', () => {

    const endState = todolistsReducer(startState, changeTodoListFilterActionCreator(todoListId1, "Completed"))

    expect(endState[0].filter).toBe('Completed')
});


test('todolist title should be updated', () => {

    const endState = todolistsReducer(startState, changeTodoListTitleActionCreator(todoListId2, 'Updated Title'))

    expect(endState[1].title).toBe('Updated Title')
});
