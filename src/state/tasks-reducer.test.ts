import {v1} from "uuid"
import {TaskStateType} from "../types/types";
import {
    AddNewTaskActionCreator,
    ChangeTaskStatusActionCreator, ChangeTaskTitleActionCreator,
    RemoveTaskActionCreator,
    tasksReducer
} from "./tasks-reducer";

test('correct task should be added', () => {
    let todoListID = v1()
    let newTaskTitle = 'New Task'

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
        ]
    }

    const endState = tasksReducer(startState, AddNewTaskActionCreator(todoListID, newTaskTitle))

    expect(endState[todoListID][2].title).toBe(newTaskTitle)
    expect(endState[todoListID][2].isDone).toBe(false)
})

test('task status should be updated', () => {
    let todoListID = v1()

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ],

    }

    const endState = tasksReducer(startState, ChangeTaskStatusActionCreator(todoListID, startState[todoListID][2].id, true))

    expect(endState[todoListID][2].isDone).toBe(true)

})

test('task title should be updated', () => {
    let todoListID = v1()

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ],

    }

    const endState = tasksReducer(startState, ChangeTaskTitleActionCreator(todoListID, startState[todoListID][2].id, 'Updated Title'))

    expect(endState[todoListID][2].title).toBe('Updated Title')

})


test('correct task should be removed', () => {
    let todoListID = v1()

    const startState: TaskStateType = {
        [todoListID]: [
            {id: v1(), title: 'First Task', isDone: true},
            {id: v1(), title: 'Second Task', isDone: false},
            {id: v1(), title: 'Third Task', isDone: false},
        ],

    }

    const endState = tasksReducer(startState, RemoveTaskActionCreator(todoListID, startState[todoListID][0].id))

    expect(endState[todoListID].length).toBe(2)
    expect(endState[todoListID][0].title).toBe('Second Task')

})
