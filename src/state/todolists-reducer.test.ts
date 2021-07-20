import {v1} from "uuid"
import {TodoListType} from "../types/types";
import {todolistsReducer} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, {type: "TODOLIST/REMOVE_TODOLIST", todolistID: todoListId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()
    let todoListId3 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, {
        type: "TODOLIST/ADD_TODOLIST", todoList: {
            filter: 'All',
            title: 'third todo',
            id: todoListId3
        }
    })

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(todoListId3)
    expect(endState[2].title).toBe('third todo')
})

test('todolist filter should be updated', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, {
        type: "TODOLIST/CHANGE_TODOLIST_FILTER",
        filter: "Active",
        todolistID: todoListId1
    })

    expect(endState[0].filter).toBe('Active')
});


test('todolist title should be updated', () => {
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, filter: "All", title: 'first todolist'},
        {id: todoListId2, filter: "All", title: 'second todolist'},
    ]

    const endState = todolistsReducer(startState, {
        type: "TODOLIST/CHANGE_TODOLIST_TITLE",
        todolistID: todoListId2,
        title: 'Updated Title'
    })

    expect(endState[1].title).toBe('Updated Title')
});
