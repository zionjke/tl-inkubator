import {v1} from "uuid"
import todolistsReducer, {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    deleteTodolist,
    setTodolists,
    TodolistDomainType
} from "../features/todolists/todolists-reducer";


let todoListId1: string;
let todoListId2: string;
let startState: TodolistDomainType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        {id: todoListId1, filter: "All", title: 'first todolist', addedDate: '', order: 0, entityStatus: "idle"},
        {id: todoListId2, filter: "All", title: 'second todolist', addedDate: '', order: 0, entityStatus: "idle"},
    ]
})

test(' todolist should be set to the state', () => {
    const action = setTodolists(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todoListId2)
})

test('correct todolist should be removed', () => {
    const action = deleteTodolist({id: todoListId1})
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    const todolist = {
        id: 'todoListId3',
        title: 'third todolist',
        addedDate: '',
        order: 0
    }
    const action = addTodolist(todolist)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('third todolist')
})

test('todolist filter should be updated', () => {
    const action = changeTodolistFilter({id: todoListId1, filter: 'Completed'})
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('Completed')
});


test('todolist title should be updated', () => {
    const action = changeTodolistTitle({id: todoListId2, title: 'Updated Title'})
    const endState = todolistsReducer(startState, action)

    expect(endState[1].title).toBe('Updated Title')
});
