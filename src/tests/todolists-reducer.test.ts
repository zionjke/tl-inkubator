import {v1} from "uuid"
import todolistsReducer, {
    changeTodolistFilter,
    createTodoList,
    fetchTodoLists,
    removeTodoList,
    TodolistDomainType,
    updateTodoListTitle
} from "../features/todolists/todolists-reducer";


let todoListId1: string;
let todoListId2: string;
let startState: TodolistDomainType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        {id: todoListId1, filter: "All", title: 'first Todolist', addedDate: '', order: 0, entityStatus: "idle"},
        {id: todoListId2, filter: "All", title: 'second Todolist', addedDate: '', order: 0, entityStatus: "idle"},
    ]
})

test(' Todolist should be set to the state', () => {
    const action = fetchTodoLists.fulfilled(startState,'')
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe(todoListId2)
})

test('correct Todolist should be removed', () => {
    const action = removeTodoList.fulfilled({id: todoListId1}, '', todoListId1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct Todolist should be added', () => {
    const todolist = {
        id: 'todoListId3',
        title: 'third Todolist',
        addedDate: '',
        order: 0
    }
    const action = createTodoList.fulfilled(todolist, '', todolist.title)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('third Todolist')
})

test('Todolist filter should be updated', () => {
    const action = changeTodolistFilter({id: todoListId1, filter: 'Completed'})
    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('Completed')
});


test('Todolist title should be updated', () => {
    const param = {todolistID: todoListId2, title: 'Updated Title'}
    const action = updateTodoListTitle.fulfilled(param, '', param)
    const endState = todolistsReducer(startState, action)

    expect(endState[1].title).toBe('Updated Title')
});
