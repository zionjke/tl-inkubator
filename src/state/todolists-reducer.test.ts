import {v1} from "uuid"
import {TodoListType} from "../types/types";
import {
    addTodoListActionCreator,
    changeTodoListFilterActionCreator,
    changeTodoListTitleActionCreator,
    removeTodoListActionCreator,
    todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, removeTodoListActionCreator(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()


    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, addTodoListActionCreator('third todo'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('third todo')
})

test('todolist filter should be updated', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, changeTodoListFilterActionCreator(todoListId1,"Completed"))

    expect(endState[0].filter).toBe('Completed')
});


test('todolist title should be updated', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, changeTodoListTitleActionCreator(todoListId2,'Updated Title'))

    expect(endState[1].title).toBe('Updated Title')
});
